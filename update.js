// Update UI is deliberately separate from saved game state and battle controls.
(() => {
  'use strict';
  const release=globalThis.SIEGE_RELEASE;
  const byId=id=>document.getElementById(id);
  byId('appVersion').textContent=release?.label||'バージョン不明';
  const notice=byId('updateNotice'),status=byId('updateStatus');
  const apply=byId('applyUpdate'),retry=byId('retryUpdate');
  const checkButton=byId('checkUpdate'),checkStatus=byId('checkUpdateStatus');
  let registration=null,battleActive=false,waiting=null,readyToReload=false;
  let applyRequested=false,checking=false,lastCheck=0,hasError=false;
  const supported=!!release&&typeof navigator!=='undefined'&&'serviceWorker' in navigator&&
    typeof location!=='undefined'&&location.protocol==='https:';
  let hadController=supported&&!!navigator.serviceWorker.controller;
  function show(message,{canApply=false,canRetry=false}={}){
    status.textContent=message;
    apply.hidden=!canApply;retry.hidden=!canRetry;
    apply.textContent=readyToReload?'画面を更新':'アップデートする';
    notice.hidden=battleActive;
  }
  function clear(){notice.hidden=true;status.textContent='';apply.hidden=true;retry.hidden=true;}
  function showReady(){
    if(readyToReload)show('アップデートの準備ができました。画面を更新してください。',{canApply:true});
    else if(waiting)show('アップデートがあります。戦闘が終わってから更新できます。',{canApply:true});
  }
  function failed(detail){
    applyRequested=false;hasError=true;
    const reason=detail?'（'+String(detail).slice(0,140)+'）':'';
    show('更新ファイルを取得できませんでした'+reason+'。通信や公開ファイルを確認し、再試行してください。現在のゲームと保存データはそのままです。',{canRetry:true});
    checkStatus.textContent='更新に失敗しました。再試行できます。';
  }
  function watch(worker){
    if(!worker)return;
    const changed=()=>{
      if(worker.state==='installed'&&navigator.serviceWorker.controller){
        waiting=registration.waiting||worker;checkStatus.textContent='アップデートがあります。';showReady();
      }else if(worker.state==='redundant'&&!readyToReload){
        if(waiting===worker)waiting=null;
        failed('インストールに失敗');
      }
    };
    worker.addEventListener('statechange',changed);
    changed();
  }
  function connect(reg){
    registration=reg;
    reg.addEventListener('updatefound',()=>{checkStatus.textContent='更新ファイルを確認しています…';watch(reg.installing);});
    if(reg.installing)watch(reg.installing);
    if(reg.waiting){waiting=reg.waiting;showReady();}
  }
  async function check(manual=false){
    if(!supported){if(manual)checkStatus.textContent='この環境ではPWA更新を確認できません。';return;}
    if(checking)return;
    checking=true;hasError=false;lastCheck=Date.now();
    if(manual)checkStatus.textContent='更新を確認しています…';
    try{
      if(navigator.onLine===false)throw Error('オフラインです');
      if(!registration){
        const reg=await navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'});
        connect(reg);
      }
      await registration.update();
      if(registration.waiting){waiting=registration.waiting;showReady();}
      else if(manual&&!registration.installing&&!hasError)checkStatus.textContent='現在は最新版です（'+release.label+'）。';
    }catch(error){failed(error?.message||'通信エラー');}
    finally{checking=false;}
  }
  apply.onclick=()=>{
    if(battleActive)return;
    if(readyToReload){location.reload();return;}
    const worker=registration?.waiting||waiting;
    if(!worker){failed('待機中の更新が見つかりません');return;}
    applyRequested=true;
    show('安全に切り替えています…');
    worker.postMessage({type:'SIEGE_ACTIVATE'});
    setTimeout(()=>{if(applyRequested)failed('切り替えが完了しませんでした');},15000);
  };
  retry.onclick=()=>{clear();void check(true);};
  checkButton.onclick=()=>{void check(true);};
  const api={
    setBattleActive(active){battleActive=!!active;if(battleActive)notice.hidden=true;
      else if(waiting||readyToReload)showReady();else if(status.textContent)notice.hidden=false;},
    check:()=>check(true)
  };
  globalThis.SIEGE_UPDATES=api;
  if(!supported)return;
  navigator.serviceWorker.addEventListener('message',event=>{
    if(event.data?.type==='SIEGE_UPDATE_ERROR')failed(event.data.detail||'ファイル不足');
  });
  navigator.serviceWorker.addEventListener('controllerchange',()=>{
    if(applyRequested){applyRequested=false;if(battleActive){readyToReload=true;showReady();}
      else location.reload();return;}
    if(hadController){readyToReload=true;showReady();}
    hadController=true;
  });
  window.addEventListener('load',()=>{void check(false);});
  document.addEventListener('visibilitychange',()=>{
    if(!document.hidden&&Date.now()-lastCheck>60000)void check(false);
  });
})();
