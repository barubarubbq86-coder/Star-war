# GitHub Desktopで既存Pagesを安全に更新する

1. Androidで現在のXP・星缶・編成・自作キャラ・ステージ・絵・画像選択が残っていることを確認し、現在のゲームURLと更新前のコミットを控える。
2. GitHub Desktopで現在公開中のリポジトリを開く。Pagesが公開するブランチ／フォルダ（rootまたはdocs等）を確認する。同じリポジトリ・同じ配信URLを使う。
3. `starling-siege-phase2.1-fix.zip` を展開する。展開直下にindex.html、game.js、characters.js、designs.js、sw.js、assetsがあることを確認する。
4. **中身をassetsフォルダごと**既存の公開元へ上書きする。ZIPを1ファイル置くだけでは更新されない。リポジトリ管理用の.gitは操作しない。
5. GitHub Desktopで変更を確認する。実行コードの差分はindex.html、game.js、sw.js。characters.jsと全画像はPhase 2と同一のため、既に配置済みなら変更一覧に出なくても正常。ディスク上で次の階層が存在することを確認する。

   - assets/characters/enemy_womosan/idle.png
   - assets/characters/enemy_rourusan/attack.png
   - assets/characters/enemy_bunbunsensei/knockback.png

   idle.png、attack.png等を直下に集めない。全9体×3画像の階層を維持する。characters.jsも直下に必要。
6. コード・文書・不足していた画像があればそれも1つのCommitにまとめ、Push originする。GitHub Pagesのデプロイ成功を待つ。
7. Androidをオンラインにし、戦闘終了後、同じゲームのタブとPWAウィンドウを閉じ、従来URLを開く。古い画面なら通常の再読み込み後、一度閉じて開き直す。必要なら時間をおき、Pagesのデプロイ完了・ファイル配置を再確認する。
8. 上部に「Phase 2.1」、ホームに「新しい敵7体を選んで遊ぶ」があることを確認する。「敵・自作敵」で7体の画像を確認する。
9. ANDROID_CHECKLIST.mdに従い、選択→保存→再読込→出撃、旧データ維持を確認する。オンラインで新版を取得した後に、機内モードでオフライン表示を試す。

ブラウザのサイトデータ、localStorage、IndexedDBを削除しない。PWAの削除・再インストールは必要ない。PCとAndroidの保存は別。

## キャッシュと公開確認

Service Workerは `v11-phase2.1`。同じスコープの旧シェルキャッシュだけを更新し、starlingSiegeやstarlingSiegeArtには触れない。新しいindex・game・charactersを含む44URLを一式で事前取得する。1ファイルでも取得に失敗すると新Workerのインストールが完了せず、旧画面が残る可能性がある。

更新されない場合は、実際の公開URLの下で `characters.js` と上記PNGのパスが開けるか、404になっていないか、GitHub Pagesの公開元がコピー先と一致するかを確認する。フォルダ名の大小文字も区別される。ゲーム上部の版表示が変わらなければ、新UIの問題ではなく配信／更新状況を先に確認する。現時点ではユーザー公開先の404発生は未確認。

前の版へ戻す際も、戻す内容に合った新しいシェルキャッシュ版が必要になる場合がある。保存データを消して対処しない。
