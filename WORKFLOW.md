# ブランチ管理ワークフロー

このドキュメントでは、作業ブランチと公開ブランチを分けて管理するワークフローを説明します。

## ブランチ構成

### 作業ブランチ
- **ブランチ名**: `feature/create-profile-page`
- **用途**: 開発・修正作業用
- **直接編集**: ✅ 可能
- **GitHub Pages公開**: ❌ されない

### 公開ブランチ
- **ブランチ名**: `gh-pages`
- **用途**: GitHub Pagesで公開されるブランチ
- **直接編集**: ❌ 禁止（作業ブランチからマージする）
- **GitHub Pages公開**: ✅ 自動的に公開される

## ワークフロー

### 1. 開発・修正作業時

作業ブランチに切り替えて作業を行います：

```bash
# 作業ブランチに切り替え
git checkout feature/create-profile-page

# 作業・修正を行う
# ファイルを編集、追加など

# 変更をステージング
git add .

# 変更をコミット
git commit -m "変更内容の説明"

# リモートにプッシュ
git push origin feature/create-profile-page
```

### 2. 公開する時（作業が完了したら）

作業が完了し、公開する準備ができたら、公開ブランチにマージします：

```bash
# 現在のブランチを確認
git branch

# 公開ブランチに切り替え
git checkout gh-pages

# 作業ブランチの変更をマージ
git merge feature/create-profile-page

# リモートにプッシュ（GitHub Pagesが自動的に更新されます）
git push origin gh-pages

# 作業ブランチに戻る（次の作業のため）
git checkout feature/create-profile-page
```

### 3. 作業ブランチを最新の状態に保つ

公開ブランチに変更があった場合、作業ブランチにも反映させます：

```bash
# 作業ブランチに切り替え
git checkout feature/create-profile-page

# 公開ブランチの変更をマージ
git merge gh-pages

# リモートにプッシュ
git push origin feature/create-profile-page
```

## 注意事項

### ✅ やること

- 作業ブランチ（`feature/create-profile-page`）で開発・修正を行う
- 作業ブランチでコミット・プッシュする
- 公開する時は、作業ブランチから `gh-pages` にマージする

### ❌ やらないこと

- `gh-pages` ブランチを直接編集しない
- `gh-pages` ブランチで直接コミットしない
- 作業ブランチをスキップして `gh-pages` に直接変更を加えない

## GitHub Pages

- **公開ブランチ**: `gh-pages`
- **公開URL**: https://shigetomoyamamoto.github.io/cursor-developed-from-smartphone/
- **更新タイミング**: `gh-pages` ブランチにプッシュすると自動的に更新される（数分かかる場合があります）

## トラブルシューティング

### 間違って `gh-pages` ブランチで作業してしまった場合

```bash
# 変更をコミットせずに作業ブランチに戻る
git checkout feature/create-profile-page

# 変更をステージング
git add .

# コミット
git commit -m "変更内容"

# 公開ブランチにマージ
git checkout gh-pages
git merge feature/create-profile-page
git push origin gh-pages
```

### 作業ブランチと公開ブランチの差分を確認

```bash
# 作業ブランチに切り替え
git checkout feature/create-profile-page

# 公開ブランチとの差分を確認
git diff gh-pages
```

## 参考

- [GitHub Pages ドキュメント](https://docs.github.com/ja/pages)
- [Git ブランチ管理のベストプラクティス](https://www.atlassian.com/ja/git/tutorials/comparing-workflows)
