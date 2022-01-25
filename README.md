> 定义你自己的git规则，甚至定义新命令

## 环境依赖

- Node v12+
- git

## 原理浅析

- 使用nodejs“代理”git命令行工具，通过安装nodejs bin生成新git命令，覆盖原有git命令
- 拦截git执行命令，分析风险命令并打断执行（抛出错误）

## 安装说明

1. clone本仓库到任意位置
2. 检查git，运行`which git`，获取本机git程序位置，查看该结果是否与配置文件`profile.json`的`which_program`字段一致
    1. 如果不一致，可复制`profile.json`到`profile.local.json`生成本地配置，修改本地配置中的`which_program`到正确git程序位置。（具体配置合并规则可查看`profile.js`）
3. 运行`npm install . -g`安装程序
4. 打开新窗口，运行`which git`发现git程序位置已经变化，说明安装成功 (比如git的位置从`/usr/bin/git`变为`~/.nvm/versions/node/v12.20.2/bin/git`)

> 如果使用nvm管理，需注意切换版本后要重新安装

## 自定义

1. 在`profile.json`中定义需要控制的git命令，以及生效的项目
2. 在`rules.js`修改规则
3. 如果要建立新的规则，可fork本项目

> 当然基于这个工具，我们也可以拓展一些语法糖，比如实现`git newfeature`功能。以及基于这个思想，除了git，我们还可以拓展更多的程序。

