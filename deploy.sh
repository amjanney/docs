#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# dist目录发布到 https://xiumubai.github.io
# git push -f将本地的代码库推送到远端，并覆盖
git push -f https://github.com/xiumubai/xiumubai.github.io.git master
