# cursor-developed-from-smartphone
スマホからcursorを使って開発をできるかテストを行う

## ブランチ管理ルール

このリポジトリでは、作業ブランチと公開ブランチを分けて管理しています。

### ブランチ構成

- **作業ブランチ**: `feature/create-profile-page` - 開発・修正作業用
- **公開ブランチ**: `gh-pages` - GitHub Pagesで公開されるブランチ

### ワークフロー

#### 1. 開発・修正作業時

作業ブランチに切り替えて作業を行います：

```bash
# 作業ブランチに切り替え
git checkout feature/create-profile-page

# 作業・修正を行う
# ...

# 変更をコミット
git add .
git commit -m "変更内容の説明"

# リモートにプッシュ
git push origin feature/create-profile-page
```

#### 2. 公開する時（作業が完了したら）

作業が完了し、公開する準備ができたら、公開ブランチにマージします：

```bash
# 公開ブランチに切り替え
git checkout gh-pages

# 作業ブランチの変更をマージ
git merge feature/create-profile-page

# リモートにプッシュ（GitHub Pagesが自動的に更新されます）
git push origin gh-pages
```

### 注意事項

- 作業ブランチ（`feature/create-profile-page`）で開発・修正を行います
- 公開ブランチ（`gh-pages`）は直接編集せず、作業ブランチからマージします
- GitHub Pagesは `gh-pages` ブランチの内容を自動的に公開します
- 公開URL: https://shigetomoyamamoto.github.io/cursor-developed-from-smartphone/
