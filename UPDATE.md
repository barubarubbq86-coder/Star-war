# Phase 3.1をGitHub Desktopで既存Pagesへ反映する

1. 今遊んでいるURL・リポジトリ・Pages公開元（rootかdocs等）・更新前コミットを控え、AndroidのXP、星缶、編成、絵、自作ステージが残っていることを確認します。Phase 3.1のバックアップ機能を実機で試す前には、残っているデータを手動でも控えてください。
2. `starling-siege-phase3.1-ux-save.zip` を展開し、直下のindex.htmlと、同じ階層のbackup.js、stages.js、game.js、characters.js、designs.js、sw.js、assetsフォルダを確認します。
3. GitHub Desktopで**従来のリポジトリ・公開ブランチ／公開フォルダ**を開き、ZIPの中身をそこへ上書きします。新リポジトリやURLにしません。ZIPそのものを置くだけでは動作しません。
4. 特に `stages.js` をindex.htmlと同じ階層へ、画像は `assets/characters/enemy_womosan/idle.png` の階層へ置きます。同名のidle.pngを直下へ集めません。.gitは触れません。
5. GitHub Desktopの変更一覧でindex.html、game.js、backup.js、sw.jsと文書を確認し、1つのCommitへまとめてPush originします。stages.jsと既存PNGは同一なので差分なしで正常です。
6. GitHub Pagesデプロイ成功後、オンラインで**同じURL**をAndroidから開きます。戦闘を終えたうえで古いタブ／PWAウィンドウを閉じ、通常の再読み込み後に開き直します。章タブ・Phase 3.1表示を確認します。
7. ANDROID_CHECKLIST.mdに従い、旧保存・自作ステージ・絵・章進行を確認してから、バックアップをダウンロードしてファイルの存在を確かめます。実機での復元試験は、元に戻せる**別のテストデータ**で行ってください。その後、機内モードで起動と画像表示を試します。

サイトデータ、localStorage、IndexedDBは削除しません。PWAの削除・再インストールも不要です。PCとAndroidの保存は別です。

Service Workerのシェルキャッシュは `v13-phase3.1`。backup.jsを含む46URLをまとめて取得できた時だけ新シェルが有効になります。欠落・404があると旧画面のままになり得るため、Pagesの公開先で同じURL配下のbackup.js、stages.js、characters.js、assets/characters/enemy_bunbunsensei/knockback.pngが開けるか確認します。別アプリのキャッシュ・端末内の画像データは消しません。公開URL未提示のため、この環境では公開先の404は未確認です。
