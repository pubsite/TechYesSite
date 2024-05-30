---
title: Surface RT 保姆级新手上路
categories: [日常]
author: bingtangxh
date: 2024-05-28 17:52:26
updated: 2024-05-30 14:08:44
---

## 一、准备工作和下载，下述一个都不能少

1.	另一台能够使用 Windows 和 Linux 的普通电脑
2.	一个集线器
3.	一个至少 16GB 的 microSD 卡，建议 64GB 为宜
4.	一个读卡器
5.	一个至少 16GB 的 U 盘（机械移动硬盘供电不够，不能用）
6.	一个 USB 键盘，哪怕是三键的键盘都行
7.	下载 [Jail Break](https://jwa4.gitbook.io/windows/tools/surface-rt-and-surface-2-jailbreak-usb)
8.	下载 [特制的树莓派系统镜像](https://files.open-rt.party/Linux/Distro/2023-10-10-raspios-bookworm-surface-rt-armhf-full.img.xz)，约 2.8GB
9.	下载安装树莓派系统烧录器
10.	下载 [特制的 GNU GRUB](https://github.com/makuhlmann/grub-2.04-nokeymod/releases) 和我给的 `grub.cfg`
    {% folding child:codeblock grub.cfg %}
    ```sh
    insmod ext2

    search --no-floppy --set=root --file /EFI/Microsoft/Boot/boutmgfw.efi

    insmod font

    set gfxmode=1366x768
    set gfxpayload=keep
    insmod efi_gop
    insmod efi_uga
    insmod gfxterm
    terminal_output gfxterm

    ls

    echo "How about we explore the area ahead of us later?"

    loadfont /unicode.pf2

    echo "按音量键不会使GRUB2停止计时，你只有5秒钟。"

    insmod png
    # 这里就有一行注释掉的设置主题的指令，你取消注释直接用就行
    # set theme=/theme/Manjaro/theme.txt
    export theme

    set menu_color_normal=white/black
    set menu_color_highlight=black/light-gray

    set timeout=5
    set default=3

    menuentry "Raspberry Pi（需mmcblk1p1）" {
            set gfxpayload=keep
            # linux /zImage root=/dev/mmcblk1p1 quiet rw rootwait console=tty0 cpuidle.off=1
            linux /zImage root=/dev/mmcblk1p1 cpuidle.off=1
            devicetree /tegra30-microsoft-surface-rt-efi.dtb
    }
    menuentry "Raspberry Pi（需mmcblk1p2）" {
            set gfxpayload=keep
            # linux /zImage root=/dev/mmcblk1p2 quiet rw rootwait console=tty0 cpuidle.off=1
            linux /zImage root=/dev/mmcblk1p2 cpuidle.off=1
            devicetree /tegra30-microsoft-surface-rt-efi.dtb
    }
    menuentry "Raspberry Pi（需mmcblk1p2,安静）" {
            set gfxpayload=keep
            linux /zImage root=/dev/mmcblk1p2 quiet rw rootwait console=tty0 cpuidle.off=1
            # linux /zImage root=/dev/mmcblk1p2 cpuidle.off=1
            devicetree /tegra30-microsoft-surface-rt-efi.dtb
    }
    menuentry "Windows RT 8.1" {
            chainloader /EFI/Microsoft/Boot/boutmgfw.efi
    }
    menuentry "重新启动" {
            echo "System rebooting..."
            reboot
    }
    menuentry "关机" {
            echo "System shutting down..."
            halt
    }
    menuentry "从下一个卷启动" {
            exit
    }
    ```
    {% endfolding %}
11.	下载 Li_zip [为 RT 打包整理的 appx](https://www.bilibili.com/video/bv1xs421w7ux) （可选的，如果不打算玩 RT 的应用就不要。通常要用这些软件，就要禁用 sppsvc，因为 sppsvc 会阻止运行侧载软件启动。而禁用 sppsvc 会导致 Windows 在此期间未激活，Office 也认为未激活。）
同时也要下载 [Li_zip 提供的 Product Policy Editor 和 Windows App Boss](https://www.123pan.com/s/nu9rvv-ttrch.html)
12.	下载 [Signtool 和 RT Jail Break](https://www.bilibili.com/read/cv17483017)（可选的，与 Jail Break 不同，这个是一些桌面应用程序）
13.	一个能访问 archive.org 的环境或代理（可选，如果不需要额外下载 Windows 的开始屏幕等类似补丁，或者你的 Windows 系统当年已经安装这些更新，就不需要）
14.	Surface RT 的原厂镜像。访问 [Surface 恢复映像下载](https://support.microsoft.com/zh-cn/surface-recovery-image)然后按照提示选择型号，输入序列号，下载原厂镜像。
15.	如果你发现你的 C 盘是带锁的，即启用了设备加密，那么请以管理员身份打开命令提示符，输入 `manage-bde -off C:`
此期间不会有进度条，如果想查看进度，可以输入` manage-bde -status C:`
注意这个加密百分比应该是从 100% 往 0% 递减的，因为你是在“反加密”。当已加密百分比是 0 的时候，就说明解密完毕了。
你如果暂时不打算将其解密，那就要导出恢复密钥，以防发生意外使得 TPM 自动解锁失效，导致你无法进入 Windows 系统。在资源管理器中右键C盘，选择管理 BitLocker，然后点击“备份恢复密钥”将其备份到U盘，将来如果进不去系统了就可以在恢复环境中输入密钥，然后用那里的命令提示符输入上述指令解密。

## 二、开始突破

1.	在正常电脑上操作：将 Jail Break 文件夹的所有文件都放到U盘里，让 `menu` 这个文件在 U 盘的根目录。
2.	你可以这个时候把下载好的树莓派镜像写入到 microSD 卡里，在此期间继续以下步骤，统筹安排节省时间。
先将下载的 xz 文件解压，得到 img 文件。然后打开安装好的树莓派镜像烧录器 Raspberry Pi Imager，左边 Device 选 NO FILTERING，中间“系统”选择菜单最下面的 Use Custom，然后选择 img 镜像文件，右边“储存卡”选择你要存放树莓派系统的 microSD 卡。开始写入。
写入完毕后还会自动进行校验。当整篇文章完成后，你可以删除 bootfs 分区，用其他分区软件（例如 DiskGenius 或 KDE 分区管理器）在未划给 rootfs 分区（ext4 文件系统）的空间上新建一个 FAT32 分区，用来存放你个人的媒体和文档。
3.	现在把集线器插到 RT 上，把实体键盘和U盘插到 RT 上。你的键盘必须有回车键。（RT 的自带键盘或者任何蓝牙键盘到时候都不能用）
4.	在 RT 上，打开 U 盘，以管理员身份运行 Jail Break 的主菜单，等待出现界面后，输入`1`（Install Yahallo），按 Enter。
5.	等待返回主界面，再按下`5`（set boot menu timeout），然后输入一个靠谱的数值，比如`10`，再按Enter。
6.	现在USB口只留下U盘和键盘，别的都拔掉，重启 RT。在黑屏后立即按住音量减键。Surface 会从 U 盘启动。
7.	看到出现 Windows Boot Manager 的黑白英文界面后，用键盘选择 install Golden Keys 。要求你同意协议，选 accept。你要是不同意的话你的目的达不成啊。（Golden Keys 的安装界面特殊适配，可以识别开始按钮，而启动菜单不行）注意，一旦正常进入 Windows 系统，那么 Golden Keys 很可能就会失效。对于此种情况（我就是），必须趁 Windows 没插手，立即再次长按音量减键，从 U 盘启动，然后用键盘选择 Install Yahallo，选了这个后 Surface 会不出现任何交互界面直接重启。这次会我用的 RT 还有一个逆天问题，长按音量减键进入 U 盘的界面时，它会检测到我按的音量减，于是焦点往下移动一格，然后默认倒计时停止。而这个界面你只有按音量键可以代替上和下方向键，开始按钮和电源按钮都起不到回车进入的作用，逆天吧！必须借助外接键盘，就为了按那么一个回车。而RT又只有一个 USB 口，所以得有集线器。
8.	现在可以进入 Windows 系统了，运行 `msinfo32`，看看“安全启动状态”是不是关闭了。
9.	如果已经关闭了安全启动，那就进行正式开始的步骤！
如果还是开着的，那只能清空内置硬盘重装系统了。先格式化 U 盘（U 盘必须格成 FAT32 文件系统），然后将之前下载的原厂镜像文件全部复制到 U 盘。将 Surface 从 U 盘启动，进入“疑难解答→高级选项→命令提示符”，依次输入：（`rem` 开头的是注释，无需输入）
    ```bat
    diskpaRT
    list disk
    rem （此时确认清楚哪个硬盘是内置硬盘，通常是0）
    sel disk 0
    clean
    convert gpt
    create par EFI size=500
    rem （par和partition相同，sel和select相同）
    rem （这里size的值应该不小于300）
    create par primary
    sel par 2
    assign
    exit
    ```
现在 C 盘应该是未格式化的系统盘，试试输入 `c:` 按回车，如果提示“不包含可识别的文件系统”，那就输入 `format c: /q /fs:ntfs`。如果输入 `c:` 提示“系统找不到指定的驱动器。”就再试试别的盘符。
现在关掉命令提示符窗口，然后进入疑难解答，选择初始化电脑！
完了进 Windows RT 8.1 系统，设置完一切后，你需要从头开始再试一遍突破。

## 三、正式开始

1.	现在回到正常电脑，按照网络上[这篇文章](https://openRT.gitbook.io/open-surfaceRT/surface-RT/linux/kernel/prebuilt-binaries)的方法处理 bootfs 分区中的文件。
你应该替换了下述文件：
  - `startup.nsh`
  - `zImage`
  - `acpiviewapp.efi`
  - `bootarm.efi`
（不同的 `bootarm.efi` 可指向不同的启动项目，如树莓派系统，微软恢复环境，Yahallo 等，参见[此处](https://wiki.ubuntu.com/arm/surfaceRT)）
2.	打开 bootfs 分区，找到 `\EFI\boot\bootarm.efi`，把它改名，例如 `bootarm_raspi.efi`。
3.	把之前下载的 `grub.efi` 改名叫 `bootarm.efi`，放到上一步的 `\EFI\boot\bootarm.efi` 位置。
4.	把 `unicode.pf2` 和我给的 `grub.cfg` 放到 bootfs 分区的根目录中。
5.	如果你想个性化GRUB，可以先在bootfs新建一个叫 `theme` 的文件夹，然后去 [Gnome-look](https://www.gnome-look.org/browse?cat=109)
下载一个你喜欢的主题，将其解压，然后把包含 `theme.txt` 的文件夹（注意是包含的文件夹）放到 bootfs 的 `/theme` 目录里。然后用 VScode 等软件打开 `grub.cfg`，然后加一行
    ```sh
    set theme=/theme/wonder/theme.txt
    ```
（`wonder` 为示例，具体看你下的主题）
6.	现在把存储卡插到 RT 上，以管理员身份打开命令提示符。
7.	再从这个命令提示符中输入 `start`，这样另开一个管理员的命令提示符，后续更方便。
8.	最好在这个命令提示符里输入以下指令重启资源管理器：
    ```bat
    taskkill /f /im explorer.exe
    explorer
    ```
9.	右键开始按钮，打开磁盘管理，看一下 EFI 分区是哪一个分区，从 1 开始数。
10.	再在这个命令提示符中输入：
    ```bat
    diskpart
    sel disk 0
    list par
    sel par 1
    rem （如果EFI分区是第二个就sel par 2）
    assign
    rem （与之相反的指令就是remove）
    exit
    ```
11.	执行 `notepad`。
12.	然后点击“文件→打开”，在文件浏览窗口里看看 EFI ESP 分区是哪个盘符，比如F盘。
13.	关掉记事本。
14.	执行`ren F:\EFI\Boot\bootarm.efi bootarm_ms.efi`
15.	执行`ren F:\EFI\Microsoft\Boot\bootmgfw.efi boutmgfw.efi`
（`boutmgfw.efi` 这个名称是我起的，并且在 `grub.cfg` 中指定。如果不把这个文件重命名，那么 RT 开机就一定从这个文件启动，不加载我们要的GRUB）
16.	接下来最好不要断电或者重启！下一步没完成的期间你的 RT 不能从内置硬盘启动！
17.	把 bootfs 里所有的文件都复制到 EFIESP 分区里。可以在资源管理器里复制，也可以用命令复制。
{% copy xcopy E:\* /E /-Y F:\ prefix:命令示例 %}
（例如你的 bootfs 分区是 E 盘，EFI 分区是 F 盘）
18.	大功告成！现在你的 RT 应该可以启动 GRUB，并且开机时出现启动菜单了！
