# Phase 2.1 原因調査

正式ベースは `starling-siege-phase2-characters.zip`、2,641,350 bytes、55ファイル。SHA-256: `edc4bc7f803cc4f3b0da4f79807119e505dad9943ec95b9142b0b6a3ccb708fa`。ZIP CRCと全ファイルを照合した上で、その内容から改修した。

## 実コードで確認できたこと

| 確認箇所 | Phase 2の結果 |
| --- | --- |
| characters.js | 新規敵7体が実在。下表のID・名前・分類と一致 |
| game.js | originalEnemies→allEnemies→enemyType/normalizedStageが40〜46に対応 |
| index.html | deferでdesigns.js→characters.js→game.jsの順。正しい |
| モブ候補 | M型を全件抽出。新6体も含まれるが旧敵の後ろ、画像なし |
| ボス候補 | B型を全件抽出。新ボスも含まれるがネイティブselectの末尾、画像なし |
| 敵紹介 | 「自作キャラ 敵」の閉じたdetails内に7体。最初は見えない |
| enemyRoster | 旧20体だけを表示する処理がある。ただし旧敵の名前・画像編集専用。ステージ候補の制限ではない |
| 基本8ステージ | 新敵は自動追加されない。自作ステージで設定する仕様 |
| ZIP配信構成 | characters.jsと新27PNGを含む。相対参照とassets階層に不足なし |
| Service Worker | v10-phase2が44URLを事前取得。旧版からの更新が未完了なら旧画面が残り得る |

| ID | 内部名 | 表示名 | 分類 |
| --- | --- | --- | --- |
| 40 | enemy_womosan | ヲモさん | モブ |
| 41 | enemy_rourusan | 老琉さん | モブ |
| 42 | enemy_take | 竹 | モブ |
| 43 | enemy_kangaryu | カ・ンガリュ | モブ |
| 44 | enemy_gomasama | ゴマ様 | モブ |
| 45 | enemy_paon | パオン | モブ |
| 46 | enemy_bunbunsensei | ぶんぶん先生 | ボス |

## 原因の扱い

登録欠落・固定ID上限による選択不能は正式ZIPでは再現しなかった。コードから確認できる問題は、閉じた紹介欄、画像のない候補、新しい敵が候補の末尾にあること、ホームからの案内不足という発見しにくさ。今回はこちらを最小限改修した。

公開先URL・リポジトリURL・Androidの稼働版が不明のため、ユーザー端末で見つからなかった直接原因を断定していない。ファイル不足・404・古いService Workerは可能性として残るが、発生を確認していない。Phase 2の内部モデル試験合格は、Android画面上で発見できたことを証明しない。

## 更新しても見つからない場合

画面上部の `Phase 2.1`、ホームの新敵ボタン、敵・自作敵の7枚のカードを確認する。表示されなければUPDATE.mdの手順で同じURLをオンラインで開き直す。まだ旧版なら、公開URL、表示版、GitHub Desktopの配置先、Pagesデプロイ結果、どの画面に何体表示されたかを確認する。サイトデータを消す必要はない。
