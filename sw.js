// Cache the public game shell. User art remains only in IndexedDB on this device.
const PREFIX='starling-siege-shell-'+encodeURIComponent(new URL(self.registration.scope).pathname)+'-';
const CACHE=PREFIX+'v10-phase2';
const SHELL=['./','./index.html','./game.js','./manifest.webmanifest',
  './icon-192.png','./icon-512.png','./designs.js',
  './assets/neko.png','./assets/hippo-open.png','./assets/hippo-closed.png',
  './assets/snake-low.png','./assets/snake-raised.png','./assets/duo.png',
  './assets/castle-flag.png','./assets/castle-cannon.png','./assets/sunset.webp',
  './characters.js',
  './assets/characters/ally_neko/idle.png',
  './assets/characters/ally_neko/attack.png',
  './assets/characters/ally_neko/knockback.png',
  './assets/characters/ally_naganeko/idle.png',
  './assets/characters/ally_naganeko/attack.png',
  './assets/characters/ally_naganeko/knockback.png',
  './assets/characters/enemy_womosan/idle.png',
  './assets/characters/enemy_womosan/attack.png',
  './assets/characters/enemy_womosan/knockback.png',
  './assets/characters/enemy_rourusan/idle.png',
  './assets/characters/enemy_rourusan/attack.png',
  './assets/characters/enemy_rourusan/knockback.png',
  './assets/characters/enemy_take/idle.png',
  './assets/characters/enemy_take/attack.png',
  './assets/characters/enemy_take/knockback.png',
  './assets/characters/enemy_kangaryu/idle.png',
  './assets/characters/enemy_kangaryu/attack.png',
  './assets/characters/enemy_kangaryu/knockback.png',
  './assets/characters/enemy_gomasama/idle.png',
  './assets/characters/enemy_gomasama/attack.png',
  './assets/characters/enemy_gomasama/knockback.png',
  './assets/characters/enemy_paon/idle.png',
  './assets/characters/enemy_paon/attack.png',
  './assets/characters/enemy_paon/knockback.png',
  './assets/characters/enemy_bunbunsensei/idle.png',
  './assets/characters/enemy_bunbunsensei/attack.png',
  './assets/characters/enemy_bunbunsensei/knockback.png'];
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
