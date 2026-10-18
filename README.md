# 星の砦 — Phase 3.1「操作とデータ保護」

Androidで遊べたPhase 3を基に、撤退確認、炎状オーラ、端末内バックアップ・復元を追加したHTML/CSS/JavaScriptのPWAです。28面と敵能力・出現時刻はそのままです。ステージから次に進み、自作ステージは同画面の「自作ステージを遊ぶ」から開けます。

ZIPを展開すると直下に `index.html`、`stages.js`、`characters.js`、`backup.js`、`game.js`、`sw.js`、`assets/` があります。その階層のまま**既存**GitHub Pagesの公開元へコピーします。URLやサイトデータを変えません。詳しくはUPDATE.md。

- STAGE_DESIGN.md: 全28面と1面ごとのモデル試験
- ENEMY_BALANCE.md: 基準値と7体×5段階
- SAVE_MIGRATION.md: 旧8面進行・v7保存の継承
- VALIDATION.md: 実施したテストと限界
- ANDROID_CHECKLIST.md: 実機確認
- CHANGELOG.md: 差分
- BACKUP_GUIDE.md: 手動バックアップ・復元の方法

実ブラウザとAndroid実機のファイル保存・復元操作、実PWAオフライン起動はこの開発環境では未確認です。テスト用データの実機復元後に正式版へ進めるか判断してください。
