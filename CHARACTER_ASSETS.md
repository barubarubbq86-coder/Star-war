# キャラクターと画像の対応

指示文の日本語名はLibrary上のファイル名とは一致していませんでした。Project内の `image-gen-1.png`〜`image-gen-9(2).png` を取得し、27枚すべての実画像を確認して対応を決めました。ファイル名の並びだけで推測していません。

通常9・攻撃9・ノックバック9、すべてRGBAの透過PNGとして検証済みです。元画像1254×1254を384×384へ通常のリサンプリングで縮小し、画像生成AIによる描き直し・別素材への差し替えは行っていません。竹の緑もそのまま保持しています。

ヲモさんの攻撃候補だけは、通常/ノックバックの旅人と異なる老人の姿でした。ユーザーが2026年10月18日に「この画像通り進めて」と承認したため、そのまま使っています。

画像・ステータス・名前・ID・状態と切り出し範囲は `characters.js` に一元管理します。既存の `designs.js` と旧assetsは残しています。

| 名前 | 内部ID | 状態 | 指示文の呼称 | 実際の取得元名 | 配置パス |
| --- | --- | --- | --- | --- | --- |
| ネコ | `ally_neko` | 通常 | 透明背景の白黒ふわふわ猫ステッカー.png | `image-gen-1.png` | `assets/characters/ally_neko/idle.png` |
| ネコ | `ally_neko` | 攻撃 | パンチする白猫キャラクター.png | `image-gen-1(1).png` | `assets/characters/ally_neko/attack.png` |
| ネコ | `ally_neko` | ノックバック | ノックバックする丸猫リアクション.png | `image-gen-1(2).png` | `assets/characters/ally_neko/knockback.png` |
| ながネコ | `ally_naganeko` | 通常 | 縦長シンプル猫キャラクター.png | `image-gen-2.png` | `assets/characters/ally_naganeko/idle.png` |
| ながネコ | `ally_naganeko` | 攻撃 | 突撃する白猫マスコット.png | `image-gen-2(1).png` | `assets/characters/ally_naganeko/attack.png` |
| ながネコ | `ally_naganeko` | ノックバック | ぐるぐる目のノックバック猫.png | `image-gen-2(2).png` | `assets/characters/ally_naganeko/knockback.png` |
| ヲモさん | `enemy_womosan` | 通常 | 重い袋を背負う小さな旅人.png | `image-gen-3.png` | `assets/characters/enemy_womosan/idle.png` |
| ヲモさん | `enemy_womosan` | 攻撃 | ヲモさんの豪快な袋振り下ろし攻撃.png | `image-gen-3(1).png` | `assets/characters/enemy_womosan/attack.png` |
| ヲモさん | `enemy_womosan` | ノックバック | 衝撃で吹き飛ぶ旅人と大袋.png | `image-gen-3(2).png` | `assets/characters/enemy_womosan/knockback.png` |
| 老琉さん | `enemy_rourusan` | 通常 | 杖と犬とおじいさん.png | `image-gen-4.png` | `assets/characters/enemy_rourusan/idle.png` |
| 老琉さん | `enemy_rourusan` | 攻撃 | 果敢な爺さんと突進犬.png | `image-gen-4(1).png` | `assets/characters/enemy_rourusan/attack.png` |
| 老琉さん | `enemy_rourusan` | ノックバック | 吹き飛ぶおじいさんとポチ.png | `image-gen-4(2).png` | `assets/characters/enemy_rourusan/knockback.png` |
| 竹 | `enemy_take` | 通常 | 竹の幽霊キャラクター_sprite.png | `image-gen-5.png` | `assets/characters/enemy_take/idle.png` |
| 竹 | `enemy_take` | 攻撃 | 紫の魔法を放つ竹の妖精.png | `image-gen-5(1).png` | `assets/characters/enemy_take/attack.png` |
| 竹 | `enemy_take` | ノックバック | ノックバックする竹の精霊_winking.png | `image-gen-5(2).png` | `assets/characters/enemy_take/knockback.png` |
| カ・ンガリュ | `enemy_kangaryu` | 通常 | オレンジ色の跳ねるカンガルーキャラ.png | `image-gen-6.png` | `assets/characters/enemy_kangaryu/idle.png` |
| カ・ンガリュ | `enemy_kangaryu` | 攻撃 | 右へ跳ぶオレンジカンガルー.png | `image-gen-6(1).png` | `assets/characters/enemy_kangaryu/attack.png` |
| カ・ンガリュ | `enemy_kangaryu` | ノックバック | 驚いて跳ねるカンガルー_sprite.png | `image-gen-6(2).png` | `assets/characters/enemy_kangaryu/knockback.png` |
| ゴマ様 | `enemy_gomasama` | 通常 | ごま怪獣の舌出しマスコット.png | `image-gen-7.png` | `assets/characters/enemy_gomasama/idle.png` |
| ゴマ様 | `enemy_gomasama` | 攻撃 | ゴマ様の突進インパクトスタンプ.png | `image-gen-7(1).png` | `assets/characters/enemy_gomasama/attack.png` |
| ゴマ様 | `enemy_gomasama` | ノックバック | ノックバックする黒ごまモンスター.png | `image-gen-7(2).png` | `assets/characters/enemy_gomasama/knockback.png` |
| パオン | `enemy_paon` | 通常 | かわいいちび象のシンプルイラスト.png | `image-gen-8.png` | `assets/characters/enemy_paon/idle.png` |
| パオン | `enemy_paon` | 攻撃 | 突進するゾウのトランクアタック.png | `image-gen-8(1).png` | `assets/characters/enemy_paon/attack.png` |
| パオン | `enemy_paon` | ノックバック | 驚いてのけぞるゾウキャラ.png | `image-gen-8(2).png` | `assets/characters/enemy_paon/knockback.png` |
| ぶんぶん先生 | `enemy_bunbunsensei` | 通常 | 先生バチの飛行レッスン.png | `image-gen-9.png` | `assets/characters/enemy_bunbunsensei/idle.png` |
| ぶんぶん先生 | `enemy_bunbunsensei` | 攻撃 | 攻撃ポーズの先生バチ_sprite.png | `image-gen-9(1).png` | `assets/characters/enemy_bunbunsensei/attack.png` |
| ぶんぶん先生 | `enemy_bunbunsensei` | ノックバック | 吹き飛ぶハチ先生スタンプ.png | `image-gen-9(2).png` | `assets/characters/enemy_bunbunsensei/knockback.png` |

## 表示の基準

- PNGの透過部分を実測し、描画用の切り出し範囲を画像ごとに保持します。描画時に画像を解析し直しません。
- 切り出した見える範囲の横中心と下端を、同じキャラ位置・地面位置へ合わせます。通常・攻撃・ノックバックを同じ表示高さに揃え、余白の違いによる足元の飛びを抑えます。ポーズの体形差は残ります。
- 敵は描画時に左右反転して自陣方向へ向けます。元画像は反転加工せず、左右を含めた位置合わせは描画側で行います。
- ノックバック優先、次に攻撃、最後に通常。攻撃は既存の命中処理で設定される0.24秒のタイマー、ノックバックは既存の0.74秒タイマーを使います。別の戦闘タイマーを追加していません。
- 全27画像を共有キャッシュし、状態切替ごとに新しいImageやURLを生成しません。384px RGBAを27枚展開した画素量は約15.19MiBの計算です（実際のブラウザ/GPU使用量の測定値ではありません）。
- 追加味方に利用者が取り込んだ画像は従来の保存方式で優先します。その場合は3状態とも利用者の絵になり、同梱の状態切替画像は使いません。
