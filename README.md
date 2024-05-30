# Scoop Main [![Tests](https://github.com/ScoopInstaller/Main/actions/workflows/ci.yml/badge.svg)](https://github.com/ScoopInstaller/Main/actions/workflows/ci.yml) [![Excavator](https://github.com/ScoopInstaller/Main/actions/workflows/excavator.yml/badge.svg)](https://github.com/ScoopInstaller/Main/actions/workflows/excavator.yml)

此仓库用于解决 [Scoop Main](https://github.com/ScoopInstaller/Main) 中部分app下载慢的问题。

如何添加本仓库到 Scoop
---------------------------------
运行以下命令:  
`scoop bucket add nekopaw https://github.com/NekoPawClub/scoop-apps`

如何添加新的清单文件?
----------------------------------
请阅读官方文档 [Contributing Guide](https://github.com/ScoopInstaller/.github/blob/main/.github/CONTRIBUTING.md).



## 安装 scoop
1. 设置powershell  
    ```ps
    set-executionpolicy remotesigned -s currentuser
    ```
2. 安装到指定目录 (D:\Scoop)
    ```ps
    [environment]::setEnvironmentVariable('SCOOP','D:\Scoop','User')
    $env:SCOOP='D:\Scoop'
    iex (new-object net.webclient).downloadstring('https://get.scoop.sh')
    ```

3. 验证 scoop 是否安装成功 (执行以下命令会打印 scoop 的指令列表)
    ```ps
    scoop help
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
- 安装应用程序
    ```ps
    #查找应用程序
    scoop search ffmpeg
    Results from local buckets...

    Name                  Version          Source   Binaries
    ----                  -------          ------   --------
    ffmpeg-shared         7.0.1            main
    ffmpeg                7.0.1            main
    clever-ffmpeg         3.2.6            extras
    ffmpeg-batch          3.0.6            extras
    ffmpeg-gyan-nightly   2024-05-27       versions
    ffmpeg-nightly        1716989350       versions
    ffmpeg-shared-4.4.1   4.4.1            versions
    ffmpeg-shared-nightly 115441           versions
    ffmpeg-yt-dlp         7.0.1-4-20240529 versions
    imagemagick-ffmpeg    7.1.0-53         versions
    ffmpeg                7.0.1            nekopaw

    #从指定源安装应用程序 (不指定源将按照从上到下的优先级选择安装)
    scoop install nekopaw/ffmpeg
    ```
- 一次安装多个软件 (建议优先安装aria2,后续scoop会自动调用aria2进行下载)
    ```ps
    scoop install aria2 git 7zip
    ```