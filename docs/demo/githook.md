### git-hooks

我们回到项目的根目录下。运行 ls -a 命令 ———— “-a”可以显示隐藏目录(目录名的第一位是.)。
我们可以看到，存在一个".git"名称的文件夹。
事实上，在我们项目中根目录下运行 git 命令时，git 会根据它来工作。
接来下我们进入到这个文件夹，进一步查看它内部的内容。

```shell
cd .git
ls -a
```

我们发现它内部还挺有料！不慌，我们这节课仅仅只讲到其中的一个内容 ———— hooks
可以看到，当前目录下存在一个 hooks 文件夹，顾名思义，这个文件夹提供了 git 命令相关的钩子。
继续往里看。

```shell
cd hooks
ls -a
```

ok，那我们我们可以看到有很多 git 命令相关的文件名。比如"pre-commit.sample pre-push.sample"。
回到正题——我们期望在 git 提交(commit)前，对我们的代码进行检测，如果不能通过检测，就无法提交我们的代码。
那么自然而然的，这个动作的时机应该是？————"pre commit",也就是 commit 之前。
那么现在，我们查看一下 pre-commit.sample 的内容。

```shell
# cat命令可以查看一个文件的内容
cat pre-commit.sample
```

OK，它返回了这样的内容，是一串 shell 注释。翻译过来大概意思是，这是个示例钩子，然后我们看到了这一句话

```shell
# To enable this hook, rename this file to "pre-commit".
```

意思是要启用这个钩子的话，我们就把这个文件的后缀名去掉。

虽然这样对我们本地来讲是可行的，但要注意，.git 文件夹的改动无法同步到远端仓库。
所以我们期望将 git-hook 的执行权移交到外面来。

好的，我们回到项目的根目录下,然后我们新建一个文件夹，暂时命名为".mygithooks"
然后在此文件夹下，新增一个 git-hook 文件,命名为"pre-commit"，并写入以下内容：

```shell
echo pre-commit执行啦
```

好了，我们新建了自己的 git-hook，但此时 git 并不能识别。下面我们执行这行命令：

```shell
# 项目根目录下
git config core.hooksPath .mygithooks/pre-commit
```

上述命令给我们自己的文件，配置了 git-hook 的执行权限。

但这个时候我们 git commit 的话，可能会报这样的 waring，并且没有执行我们的 shell：

```shell
hint: The 'pre-commit' hook was ignored because it's not set as executable.
hint: You can disable this warning with `git config advice.ignoredHook false`
```

这是因为我们的操作系统没有给出这个文件的可执行权限。
因此我们得再执行这样一句命令：

```shell
chmod +x .mygithooks/pre-commit
```

ok！现在我们尝试执行 git add . && git commit -m "any meesage"
我们发现控制台日志会先打印 “pre-commit 执行啦”
这意味着成功啦！

### 总结

也就是说，我们搞 git-hook 的话，要分三步走：

1. 新增任意名称文件夹以及文件 pre-commit(这个文件名字比如跟要使用的 git-hook 名字一致)！
2. 执行以下命令来移交 git-hook 的配置权限

```shell
git config core.hooksPath .mygithooks/pre-commit
```

3. 给这个文件添加可执行权限：

```shell
chmod +x .mygithooks/pre-commit
```

然后就成功啦。

这时候我们可以在 pre-commit 里写任意脚本，比如：

```shell
eslint src
```

当 eslint 扫描代码，出现 error 时，会在结束扫描时将退出码设为大于 0 的数字。
也就是会报错，这时候 commit 就无法往下执行啦，我们成功的拦截了此次错误操作。

### husky

husky 在升级到 7.x 后，做了跟我们上述同样的事。
安装它之前，我们需要在 package.json 中的 script 里，先添加

```js
"sctript": {
    //...others
    "prepare": "husky install"
}
```

prepare 是一个 npm 钩子，意思是安装依赖的时候，会先执行 husky install 命令。
这个命令就做了上述的 123 这三件事！
我们安装了 7.x 的 husky 会发现，项目根目录下生成了.husky 的文件夹。
当然，7.x 的 husky 似乎是有 bug 的，如果不能正常使用，那么我们只需要验证两件事：

1. 是否移交了 git-hook 的配置权限？
   执行命令 "git config --list"查看 core.hooksPath 配置是否存在，是否正确指向了.husky。
   如果没有，我们只需要手动的给加上就行：

```shell
git config core.hooksPath .husky
```

2. 是否是可执行文件？
   参考上述总结中的 3 即可
   这时我们的 husky 就正常了。

### @melody-core/melody-git-hook

这是我连夜撸出来的一个工具，跟 husky 有一样的功能。但没有这么多 bug。
可以参考这个文档来使用它
https://github.com/melody-core/melody-git-hook
