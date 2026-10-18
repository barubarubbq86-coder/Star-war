// Local, versioned backup. Binary art follows a small JSON manifest so large
// pictures never become base64 strings in the browser's JS heap.
(() => {
  'use strict';
  const MAGIC='STARLING-SIEGE-BACKUP/1\n';
  const PENDING='__starlingRestorePending';
  const HEADER_LIMIT=20*1024*1024,MAX_ART=32*1024*1024,MAX_FILE=1024*1024*1024;
  const encoder=new TextEncoder();
  const hex=bytes=>Array.from(new Uint8Array(bytes),b=>b.toString(16).padStart(2,'0')).join('');
  const digest=bytes=>crypto.subtle.digest('SHA-256',bytes).then(hex);
  const stateShape=raw=>{
    if(typeof raw!=='string'||raw.length>HEADER_LIMIT)throw Error('セーブデータが大きすぎます');
    let s;try{s=JSON.parse(raw);}catch{throw Error('セーブデータの形式が違います');}
    if(!s||typeof s!=='object'||Array.isArray(s)||!Number.isInteger(s.version)||s.version<1||s.version>7||
       !Number.isFinite(s.xp)||s.xp<0||!Number.isFinite(s.cans)||s.cans<0||
       !Number.isInteger(s.cleared)||s.cleared<0||s.cleared>28||
       !Array.isArray(s.customStages)||!Array.isArray(s.customChars)||!Array.isArray(s.customEnemies)||
       !Array.isArray(s.levels)||!Array.isArray(s.deck))throw Error('対応していないセーブ形式です');
    return s;
  };
  const artKey=key=>typeof key==='string'&&key.length<=100&&
    (/^ally:\d+$/.test(key)||/^enemy:[A-Za-z0-9-]+$/.test(key)||key==='paint:draft');
  const mimeOk=type=>['image/png','image/jpeg','image/webp'].includes(type);
  async function collect(db){
    return new Promise((resolve,reject)=>{
      const tx=db.transaction('art','readonly'),items=[];
      const req=tx.objectStore('art').openCursor();
      req.onsuccess=()=>{const c=req.result;if(c){if(c.key!==PENDING)items.push({key:c.key,blob:c.value});c.continue();}};
      req.onerror=()=>reject(req.error||Error('画像の読み取りに失敗しました'));
      tx.oncomplete=()=>resolve(items);
      tx.onabort=()=>reject(tx.error||Error('画像の読み取りに失敗しました'));
    });
  }
  async function replace(db,items,pending=null){
    return new Promise((resolve,reject)=>{
      let tx;try{
        tx=db.transaction('art','readwrite');const store=tx.objectStore('art');
        store.clear();for(const item of items)store.put(item.blob,item.key);
        if(pending)store.put(pending,PENDING);
      }catch(error){if(tx)tx.abort();reject(error);return;}
      tx.oncomplete=resolve;
      tx.onabort=()=>reject(tx.error||Error('画像の復元を中止しました'));
      tx.onerror=()=>{}; // onabort reports the entire atomic transaction.
    });
  }
  function pending(db){
    return new Promise((resolve,reject)=>{
      const tx=db.transaction('art','readonly'),req=tx.objectStore('art').get(PENDING);
      req.onsuccess=()=>resolve(req.result||null);
      req.onerror=()=>reject(req.error||Error('復元の状態を確認できません'));
    });
  }
  function clearPending(db){
    return new Promise((resolve,reject)=>{
      const tx=db.transaction('art','readwrite');tx.objectStore('art').delete(PENDING);
      tx.oncomplete=resolve;tx.onabort=()=>reject(tx.error||Error('復元の目印を消せません'));
    });
  }
  async function recover(db,storage){
    const marker=await pending(db);
    if(!marker)return false;
    stateShape(marker.targetRaw);
    storage.setItem('starlingSiege',marker.targetRaw);
    await clearPending(db);
    return true;
  }
  const validateArt=items=>{
    if(!Array.isArray(items)||items.length>128)throw Error('画像の件数が多すぎます');
    const keys=new Set();let bytes=0;
    for(const {key,blob} of items){
      if(!artKey(key)||keys.has(key)||!blob||typeof blob.arrayBuffer!=='function'||
         typeof blob.slice!=='function'||!mimeOk(blob.type)||
         !blob.size||blob.size>MAX_ART)throw Error('画像の形式またはキーが不正です');
      keys.add(key);bytes+=blob.size;
    }
    if(bytes>MAX_FILE)throw Error('画像データが大きすぎます');
    return bytes;
  };
  async function create(raw,items,date=new Date()){
    const state=stateShape(raw);validateArt(items);
    const descriptors=[];
    for(const {key,blob} of items){
      descriptors.push({key,type:blob.type,size:blob.size,hash:await digest(await blob.arrayBuffer())});
    }
    const header={format:'starling-siege-backup',formatVersion:1,createdAt:date.toISOString(),
      saveVersion:state.version,raw,rawHash:await digest(encoder.encode(raw)),arts:descriptors};
    const bytes=encoder.encode(JSON.stringify(header));
    if(bytes.length>HEADER_LIMIT)throw Error('バックアップの管理情報が大きすぎます');
    const prefix=MAGIC+String(bytes.length).padStart(10,'0')+'\n';
    return new Blob([prefix,bytes,...items.map(i=>i.blob)],{type:'application/octet-stream'});
  }
  async function read(file){
    if(!file||typeof file.slice!=='function'||file.size<32||file.size>MAX_FILE)throw Error('ファイルサイズが不正です');
    const prefixLen=MAGIC.length+11,prefix=await file.slice(0,prefixLen).text();
    if(!prefix.startsWith(MAGIC)||!/^[0-9]{10}\n$/.test(prefix.slice(MAGIC.length)))
      throw Error('星の砦のバックアップファイルではありません');
    const len=Number(prefix.slice(MAGIC.length,-1));
    if(!len||len>HEADER_LIMIT||prefixLen+len>file.size)throw Error('管理情報が破損しています');
    let h;try{h=JSON.parse(await file.slice(prefixLen,prefixLen+len).text());}
    catch{throw Error('管理情報が破損しています');}
    if(h?.format!=='starling-siege-backup'||h.formatVersion!==1||
       !Number.isFinite(Date.parse(h.createdAt))||!Array.isArray(h.arts)||
       h.arts.length>128||typeof h.raw!=='string')
      throw Error('バックアップの形式が違います');
    const state=stateShape(h.raw);
    if(state.version!==h.saveVersion||await digest(encoder.encode(h.raw))!==h.rawHash)
      throw Error('セーブデータが破損しています');
    let offset=prefixLen+len;const items=[],keys=new Set();
    for(const a of h.arts){
      if(!artKey(a?.key)||keys.has(a.key)||!mimeOk(a.type)||
         !Number.isInteger(a.size)||a.size<=0||a.size>MAX_ART||
         !/^[0-9a-f]{64}$/.test(a.hash)||offset+a.size>file.size)
        throw Error('画像の管理情報が破損しています');
      keys.add(a.key);
      const image=file.slice(offset,offset+a.size,a.type);
      if(await digest(await image.arrayBuffer())!==a.hash)throw Error('画像が破損しています: '+a.key);
      items.push({key:a.key,blob:image});offset+=a.size;
    }
    if(offset!==file.size)throw Error('ファイル末尾に不明なデータがあります');
    validateArt(items);
    return {raw:h.raw,items,createdAt:h.createdAt,saveVersion:h.saveVersion,
      summary:{stages:state.customStages.length,allies:state.customChars.length,
        enemies:state.customEnemies.length,images:items.length,paint:items.filter(i=>i.key==='paint:draft').length,
        xp:state.xp,cans:state.cans,cleared:state.cleared}};
  }
  // The new art and a recovery marker commit in one IndexedDB transaction.
  // A crash before the localStorage write is completed on next launch. A quota
  // error rolls back the art in a second atomic transaction before returning.
  async function restore(parsed,storage,db){
    if(!parsed||!db)throw Error('画像保存領域が使えません');
    if(await pending(db))throw Error('前回の復元を再起動して完了させてください');
    const previous=await collect(db);validateArt(previous);
    stateShape(parsed.raw);validateArt(parsed.items);
    await replace(db,parsed.items,{targetRaw:parsed.raw});
    try{
      storage.setItem('starlingSiege',parsed.raw);
    }catch(error){
      try{await replace(db,previous);}
      catch{throw Error('元の画像を戻せませんでした。画面を閉じず復元を再試行してください');}
      throw error;
    }
    // Clearing the marker is idempotent. If it fails, next launch reconciles
    // localStorage with the already committed new art before showing the game.
    try{await clearPending(db);}catch{}
  }
  window.SIEGE_BACKUP={collect,create,read,restore,recover};
})();
