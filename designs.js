// Optional visual catalog. Stable IDs are saved separately from combat stats.
// Local imported/painted art has priority; custom characters keep their own art.
window.SIEGE_DESIGNS=Object.freeze({
  ally:[{id:'original',name:'従来の見た目'},{id:'neko',name:'添付：白いネコ',file:'neko.png'}],
  enemy:[{id:'original',name:'従来の見た目'},
    {id:'mixed',name:'添付：5種類を順番に割り当て',files:['hippo-open.png','hippo-closed.png','snake-low.png','snake-raised.png','duo.png']},
    {id:'hippoOpen',name:'添付：カバ（口を開く）',file:'hippo-open.png'},
    {id:'hippoClosed',name:'添付：カバ（口を閉じる）',file:'hippo-closed.png'},
    {id:'snakeLow',name:'添付：ヘビ（這う）',file:'snake-low.png'},
    {id:'snakeRaised',name:'添付：ヘビ（頭を上げる）',file:'snake-raised.png'},
    {id:'duo',name:'添付：2体組',file:'duo.png'}],
  homeCastle:[{id:'original',name:'従来の味方城'},{id:'flag',name:'添付：赤旗の石の城',file:'castle-flag.png'}],
  enemyCastle:[{id:'original',name:'従来の敵城'},{id:'cannon',name:'添付：砲台つき猫城',file:'castle-cannon.png'}],
  background:[{id:'original',name:'従来の背景'},{id:'sunset',name:'添付：夕焼けの戦場',file:'sunset.webp'}]
});
