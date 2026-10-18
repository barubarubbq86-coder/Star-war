# GitHub Desktopで既存Pagesを更新する

1. 今遊んでいるURL・リポジトリ・Pages公開元（rootかdocs等）・更新前コミットを控え、AndroidのXP、星缶、編成、絵、自作ステージが残っていることを確認します。
2. `starling-siege-phase3-seven-heroes.zip` を展開し、直下のindex.htmlと、同じ階層のstages.js、game.js、characters.js、designs.js、sw.js、assetsフォルダを確認します。
3. GitHub Desktopで**従来のリポジトリ・公開ブランチ／公開フォルダ**を開き、ZIPの中身をそこへ上書きします。新リポジトリやURLにしません。ZIPそのものを置くだけでは動作しません。
4. 特に `stages.js` をindex.htmlと同じ階層へ、画像は `assets/characters/enemy_womosan/idle.png` の階層へ置きます。同名のidle.pngを直下へ集めません。.gitは触れません。
5. GitHub Desktopの変更一覧でindex.html、game.js、sw.js、新しいstages.jsと文書を確認し、1つのCommitへまとめてPush originします。既存PNGは同一なので差分なしでも正常です。
6. GitHub Pagesデプロイ成功後、オンラインで**同じURL**をAndroidから開きます。戦闘を終えたうえで古いタブ／PWAウィンドウを閉じ、通常の再読み込み後に開き直します。章タブ・Phase 3表示を確認します。
7. UPDATE.mdとANDROID_CHECKLIST.mdに従い、旧保存・自作ステージ・絵・章進行を確認してから、オンラインで新版の絵を一度表示し、機内モードで起動と画像表示を試します。

サイトデータ、localStorage、IndexedDBは削除しません。PWAの削除・再インストールも不要です。PCとAndroidの保存は別です。

Service Workerのシェルキャッシュは `v12-phase3`。新しいstages.jsを含む45URLをまとめて取得できた時だけ新シェルが有効になります。欠落・404があると旧画面のままになり得るため、Pagesの公開先で同じURL配下のstages.js、characters.js、assets/characters/enemy_bunbunsensei/knockback.pngが開けるか確認します。別アプリのキャッシュ・端末内の画像データは消しません。公開URL未提示のため、この環境では公開先の404は未確認です。
