// Only a verified, complete shell becomes active. User art remains in IndexedDB.
importScripts('./version.js');
const PREFIX='starling-siege-shell-'+encodeURIComponent(new URL(self.registration.scope).pathname)+'-';
const CACHE=PREFIX+globalThis.SIEGE_RELEASE.cache;
const SHELL=['./','./index.html','./version.js','./update.js','./release-manifest.json','./game.js','./manifest.webmanifest',
  './icon-192.png','./icon-512.png','./designs.js','./backup.js',
  './assets/neko.png','./assets/hippo-open.png','./assets/hippo-closed.png',
  './assets/snake-low.png','./assets/snake-raised.png','./assets/duo.png',
  './assets/castle-flag.png','./assets/castle-cannon.png','./assets/sunset.webp',
  './characters.js','./stages.js',
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
const scope=self.registration.scope;
const files=[...new Set(SHELL.map(file=>file==='./'?'index.html':file.slice(2)))];
const cachedFiles=new Set(files);
const manifestUrl=new URL('release-manifest.json',scope).href;
async function digest(response){
  const bytes=await response.arrayBuffer();
  return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),
    byte=>byte.toString(16).padStart(2,'0')).join('');
}
async function verified(file,expected){
  const url=new URL(file,scope).href;
  const response=await fetch(new Request(url,{cache:'reload'}));
  if(!response.ok)throw Error(file+' HTTP '+response.status);
  if(await digest(response.clone())!==expected)throw Error(file+' の内容が更新版と一致しません');
  return response;
}
async function notifyFailure(message){
  const clients=await self.clients.matchAll({type:'window',includeUncontrolled:true});
  for(const client of clients)client.postMessage({type:'SIEGE_UPDATE_ERROR',detail:message});
}
self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const preexisting=(await caches.keys()).includes(CACHE);
    try{
      if(preexisting)throw Error('同じバージョンのキャッシュが残っています');
      const response=await fetch(new Request(manifestUrl,{cache:'reload'}));
      if(!response.ok)throw Error('release-manifest.json HTTP '+response.status);
      const manifest=await response.clone().json();
      if(manifest.version!==globalThis.SIEGE_RELEASE.id||
         files.length!==Object.keys(manifest.files||{}).length+1||
         files.some(file=>file!=='release-manifest.json'&&!/^[a-f0-9]{64}$/.test(manifest.files[file])))
        throw Error('更新ファイル一覧とバージョンが一致しません');
      const cache=await caches.open(CACHE);
      await cache.put(manifestUrl,response);
      const entries=files.filter(file=>file!=='release-manifest.json');
      for(let i=0;i<entries.length;i+=8){
        await Promise.all(entries.slice(i,i+8).map(async file=>{
          const result=await verified(file,manifest.files[file]);
          await cache.put(new URL(file,scope).href,result.clone());
          if(file==='index.html')await cache.put(new URL('./',scope).href,result);
        }));
      }
      // Phase 3.5 has no update UI. Its one-time handoff activates a fully
      // verified shell; old running pages are left untouched until reloaded.
      if((await caches.keys()).includes(PREFIX+'v14-phase3.5'))await self.skipWaiting();
    }catch(error){
      if(!preexisting)await caches.delete(CACHE);
      await notifyFailure(String(error.message||error));
      throw error;
    }
  })());
});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(key=>key.startsWith(PREFIX)&&key!==CACHE).map(key=>caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('message',event=>{
  if(event.data?.type==='SIEGE_ACTIVATE')event.waitUntil(self.skipWaiting());
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url),base=new URL(scope);
  if(url.origin!==base.origin||!url.pathname.startsWith(base.pathname))return;
  const relative=url.pathname.slice(base.pathname.length),file=relative||'index.html';
  if(!cachedFiles.has(file))return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    const cached=await cache.match(event.request,{ignoreSearch:true});
    if(cached)return cached;
    try{
      if(file==='release-manifest.json')throw Error('検証一覧がありません');
      const manifestResponse=await cache.match(manifestUrl);
      if(!manifestResponse)throw Error('検証一覧がありません');
      const manifest=await manifestResponse.json();
      const response=await verified(file,manifest.files[file]);
      await cache.put(event.request,response.clone());
      return response;
    }catch{return new Response('更新ファイルを確認できません。通信を確認してください。',{status:503});}
  })());
});
