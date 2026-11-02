/* Phase 4.0: visual-only scenery. No battle or save state is changed here. */
(()=>{
  'use strict';
  const landscape=new Image();
  landscape.src='./assets/battle-landscape.webp';
  // Keep only the current chapter's raster, rather than retaining four large canvases.
  let scene=null,sceneKey='',apron=null;
  const atmospheres=[
    ['rgba(255,239,184,0.03)','rgba(255,246,220,0.08)'],
    ['rgba(219,104,62,0.30)','rgba(246,198,128,0.15)'],
    ['rgba(38,29,84,0.46)','rgba(110,118,145,0.20)'],
    ['rgba(111,99,181,0.28)','rgba(247,241,255,0.25)'],
    // Existing custom-stage background choices retain their six colour identities.
    ['#f2be7938','#f2be7914'],['#88dcb538','#88dcb514'],
    ['#a4b4f538','#a4b4f514'],['#e597c238','#e597c214'],
    ['#b89a7638','#b89a7614'],['#f97f7038','#f97f7014']
  ];
  function chapter(stage){
    if(stage.phase3&&Number.isInteger(stage.chapter))return Math.max(0,Math.min(3,stage.chapter));
    if(stage.extra)return 0;
    return 4+(Number.isInteger(stage.theme)?Math.max(0,Math.min(5,stage.theme)):0);
  }
  function raster(w,h,tone){
    const c=document.createElement('canvas');c.width=w;c.height=h;
    const g=c.getContext('2d');g.drawImage(landscape,0,0,w,h);
    const tint=g.createLinearGradient(0,0,0,h);
    tint.addColorStop(0,atmospheres[tone][0]);tint.addColorStop(.67,atmospheres[tone][1]);
    tint.addColorStop(1,atmospheres[tone][1]);g.fillStyle=tint;g.fillRect(0,0,w,h);
    return c;
  }
  function draw(ctx,stage,camera,viewWidth,world,ground){
    if(!landscape.complete||!landscape.naturalWidth)return false;
    const w=ctx.canvas.width,h=ctx.canvas.height,tone=chapter(stage);
    const key=w+':'+h+':'+tone;
    if(key!==sceneKey){
      // 10% overscan: mild horizontal parallax, with the original foot line fixed.
      scene=raster(Math.round(w*1.1),Math.round(h*1.1),tone);sceneKey=key;
    }
    const fraction=Math.max(0,Math.min(1,(camera+viewWidth*.5)/world));
    ctx.drawImage(scene,-Math.round((scene.width-w)*fraction),Math.round(ground*(1-scene.height/h)));
    return true;
  }
  function makeApron(){
    const c=document.createElement('canvas');c.width=200;c.height=44;
    const g=c.getContext('2d');
    g.fillStyle='rgba(40,52,37,.24)';g.beginPath();g.ellipse(100,25,96,17,0,0,Math.PI*2);g.fill();
    g.fillStyle='#8b8c72';g.beginPath();g.moveTo(14,20);g.lineTo(38,5);g.lineTo(164,5);g.lineTo(187,20);g.lineTo(178,30);g.lineTo(23,30);g.closePath();g.fill();
    g.fillStyle='#d4c7a0';g.beginPath();g.moveTo(14,20);g.lineTo(38,5);g.lineTo(164,5);g.lineTo(187,20);g.closePath();g.fill();
    g.strokeStyle='#9c957c';g.lineWidth=1.4;
    for(let i=0;i<5;i++){const x=42+i*29;g.beginPath();g.moveTo(x,7);g.lineTo(x-5,19);g.stroke();}
    g.beginPath();g.moveTo(30,13);g.lineTo(174,13);g.stroke();
    g.strokeStyle='#ebe1bb';g.beginPath();g.moveTo(22,20);g.lineTo(180,20);g.stroke();
    return c;
  }
  function castleGround(ctx,camera,viewWidth,world,ground,baseView){
    if(!scene)return;
    if(!apron)apron=makeApron();
    const scale=baseView/viewWidth,w=ctx.canvas.width;
    for(const x of [105,world-105]){
      const px=(x-camera)*w/viewWidth;
      if(px+100*scale<0||px-100*scale>w)continue;
      ctx.drawImage(apron,px-100*scale,ground-13*scale,200*scale,44*scale);
    }
  }
  globalThis.SIEGE_BATTLE_SCENE=Object.freeze({draw,castleGround});
})();
