# Scoop Apps

此仓库用于替换 Scoop Bucket 库中部分app下载速度慢的源。

如何添加本仓库到 Scoop
---------------------------------
运行以下命令:
```ps
scoop bucket add nekopaw https://github.com/NekoPawClub/scoop-apps
```

如何添加新的清单文件?
----------------------------------
请阅读官方文档 [Contributing Guide](https://github.com/ScoopInstaller/.github/blob/main/.github/CONTRIBUTING.md).



## 安装 scoop 到指定目录
```ps
#设置全局变量(需要管理员权限),个人电脑没必要设置
$env:SCOOP_GLOBAL='D:\Scoop'
[environment]::setEnvironmentVariable('SCOOP_GLOBAL',$env:SCOOP_GLOBAL'Machine')
#设置用户变量
$env:SCOOP='D:\Scoop'
[environment]::setEnvironmentVariable('SCOOP',$env:SCOOP,'User')
#安装scoop
Set-ExecutionPolicy RemoteSigned -scope CurrentUser
iex (new-object net.webclient).downloadstring('https://get.scoop.sh')
#验证安装
scoop help
#安装aria2,将自动配置为scoop默认下载器
scoop install aria2
```

## scoop 常用命令
```ps
scoop help              #帮助
scoop bucket known      #查看推荐仓库
scoop bucket add 仓库名  #添加指定仓库
scoop list              #查看当前已安装软件
scoop info app          #查看软件信息
scoop search app        #搜索软件
scoop install app       #安装软件
scoop install 仓库名/app #安装指定仓库下软件
scoop uninstall app     #卸载软件
scoop status            #查看更新
scoop cleanup           #删除旧版本
scoop cache rm app      #删除指定软件缓存
scoop cache rm *        #清理缓存
scoop checkup           #自身诊断
scoop update app        #更新指定软件
scoop update *          #更新安装的软件和scoop

# 设置代理(http)
scoop config proxy 127.0.0.1:10086
```

## 命令示例
```ps
#查找应用程序
scoop search gcc-arm-none-eabi
Results from local buckets...
Name              Version   Source  Binaries
----              -------   ------  --------
gcc-arm-none-eabi 14.2.rel1 extras
gcc-arm-none-eabi 14.2.rel1 nekopaw

#从指定源安装应用程序 (不指定源将按照从上到下的优先级选择安装)
scoop install nekopaw/gcc-arm-none-eabi

#一次安装多个应用程序
scoop install git 7zip
```
