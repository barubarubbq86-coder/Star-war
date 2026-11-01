/* Phase 3.9: battle presentation only. No save or combat rules live here. */
(()=>{
  'use strict';
  const $=id=>document.getElementById(id);
  let api,slots=[],bars=[],result=null;
  const format=n=>n>=1e9?n.toExponential(2):n.toLocaleString('ja-JP');
  const text=(node,value)=>{if(node.textContent!==value)node.textContent=value;};
  function node(tag,cls,value){const n=document.createElement(tag);n.className=cls;if(value!==undefined)n.textContent=value;return n;}
  function init(a){
    api=a;
    const strip=$('castleStrip');
    for(const [key,label]of [['home','味方の城'],['enemy','敵の城']]){
      const badge=node('div','castle-badge '+key),title=node('span','castle-name',label),amount=node('strong','castle-amount'),track=node('div','castle-track'),fill=node('span','castle-fill');
      track.append(fill);badge.append(title,amount,track);strip.append(badge);bars.push({key,amount,fill,percent:-1});
    }
    const reservedNodes=[document.querySelector('.battle-head'),strip,$('battleStatus'),document.querySelector('.battlebar')];
    let reserved=-1;
    const measure=()=>{const next=Math.ceil(reservedNodes.reduce((n,e)=>n+e.getBoundingClientRect().height,0))+8;if(next!==reserved){document.body.style.setProperty('--battle-reserved',next+'px');reserved=next;}};
    if(typeof ResizeObserver!=='undefined'){const observer=new ResizeObserver(measure);reservedNodes.forEach(n=>observer.observe(n));}
    const dlg=$('battleResultDialog');
    function leave(where){dlg.close();api.page(where);}
    $('resultRetry').onclick=()=>{const index=result.index;dlg.close();api.startBattle(index);};
    $('resultMap').onclick=()=>leave(typeof result.index==='number'&&result.index>=28?'stages':'adventure');
    $('resultHome').onclick=()=>leave('home');
    dlg.addEventListener('cancel',e=>{e.preventDefault();leave('home');});
  }
  function start(b,buttons){
    slots=[];
    const list=api.allies(),deck=api.deck();
    for(const entry of buttons){
      const {element,slot,cost}=entry,id=deck[slot],a=list[id];
      const portrait=node('span','summon-portrait'),art=api.allyArt(id);
      if(art){const img=node('img','');img.src=art.src;img.alt='';img.onerror=()=>{img.hidden=true;portrait.textContent=a.name.slice(0,2);};portrait.append(img);}
      else portrait.append(node('span','summon-monogram',a.name.slice(0,2)));
      const name=node('span','summon-name',a.name),price=node('strong','summon-price',cost+'円'),state=node('span','summon-state');
      element.replaceChildren(portrait,name,price,state);
      slots.push({...entry,state,name:a.name,lastState:''});
    }
    $('battleTitle').title=b.stage.name;
    $('battleOrders').textContent=b.stage.idea||'仲間を出撃させ、敵の城を攻めよう。';
    $('battleResultDialog').close();
  }
  function sync(b){
    text($('castleExact'),$('battleHp').textContent);
    for(const bar of bars){
      const current=Math.max(0,Math.ceil(b[bar.key])),max=b[bar.key+'Max'];
      if(bar.current!==current||bar.max!==max){
        text(bar.amount,format(current)+' / '+format(max));bar.amount.title=String(current)+' / '+String(max);bar.current=current;bar.max=max;
      }
      const percent=Math.round(Math.max(0,Math.min(1,current/max))*100);
      if(percent!==bar.percent){bar.fill.style.transform='scaleX('+(percent/100)+')';bar.percent=percent;}
    }
    for(const slot of slots){
      const cooldown=Math.max(0,b.cool[slot.slot]||0),label=b.result?'終了':cooldown>0?'準備 '+Math.ceil(cooldown)+'秒':b.money<slot.cost?'お金不足':'出撃できる';
      if(label!==slot.lastState){text(slot.state,label);slot.element.dataset.ready=label==='出撃できる'?'yes':'no';slot.element.setAttribute('aria-label',slot.name+' '+slot.cost+'円 '+label);slot.lastState=label;}
    }
  }
  function showResult(data){
    result=data;
    const dlg=$('battleResultDialog');dlg.dataset.outcome=data.win?'win':'lose';
    $('resultHeading').textContent=data.win?'勝利！':'また挑もう！';
    $('resultCaption').textContent=data.win?'砦を突破した！':'敗北';
    $('resultStage').textContent=data.name;
    $('resultTime').textContent=Math.floor(data.time/60)+'分'+String(Math.floor(data.time%60)).padStart(2,'0')+'秒';
    $('resultXp').textContent='＋'+data.xp.toLocaleString('ja-JP');
    $('resultCans').textContent='＋'+data.cans.toLocaleString('ja-JP');
    $('resultHint').textContent=data.win?'仲間といっしょに、次の冒険へ。':(data.hint||'仲間の編成や育成を見直して、もう一度。');
    $('resultMap').textContent=typeof data.index==='number'&&data.index>=28?'自作ステージへ':'マップへ戻る';
    dlg.showModal();$('resultMap').focus();
  }
  globalThis.SIEGE_BATTLE_UI={init,start,sync,showResult};
})();
