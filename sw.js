// Cache the public game shell. User art remains only in IndexedDB on this device.
const PREFIX='starling-siege-shell-'+encodeURIComponent(new URL(self.registration.scope).pathname)+'-';
const CACHE=PREFIX+'v9-phase1';
const SHELL=['./','./index.html','./game.js','./manifest.webmanifest',
  './icon-192.png','./icon-512.png','./designs.js',
  './assets/neko.png','./assets/hippo-open.png','./assets/hippo-closed.png',
  './assets/snake-low.png','./assets/snake-raised.png','./assets/duo.png',
  './assets/castle-flag.png','./assets/castle-cannon.png','./assets/sunset.webp'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys
    .filter(key=>key.startsWith(PREFIX)&&key!==CACHE)
    .map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url),scope=new URL(self.registration.scope);
  if(url.origin!==scope.origin||!url.pathname.startsWith(scope.pathname))return;
  const relative=url.pathname.slice(scope.pathname.length);
  if(!SHELL.some(file=>file.slice(2)===relative))return;
  // One precached shell version stays coherent, including offline design assets.
  event.respondWith(caches.open(CACHE).then(async cache=>{
    const cached=await cache.match(event.request,{ignoreSearch:true});
    if(cached)return cached;
    const response=await fetch(event.request);
    if(response.ok)await cache.put(event.request,response.clone());
    return response;
  }));
});
