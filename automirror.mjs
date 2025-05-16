import path from 'path';
import fs from 'fs';

/**
 * 日期格式化器,用法: new Date().format("yyyy-MM-dd hh:mm:ss.fff")
 */
Date.prototype.format = function (exp) {
    let t = {
        'y+': this.getFullYear(), // 年
        'M+': this.getMonth() + 1, // 月
        'd+': this.getDate(), // 日
        'h+': this.getHours(), // 时
        'm+': this.getMinutes(), // 分
        's+': this.getSeconds(), // 秒
        'f+': this.getMilliseconds(), // 毫秒
        'q+': Math.floor(this.getMonth() / 3 + 1), // 季度
    };
    for (let k in t) {
        let m = exp.match(k);
        if (m) {
            switch (k) {
                case 'y+':
                    exp = exp.replace(m[0], t[k].toString().substr(0 - m[0].length));
                    break;
                case 'f+':
                    exp = exp.replace(m[0], t[k].toString().padStart(3, 0).substr(0, m[0].length));
                    break;
                default:
                    exp = exp.replace(m[0], m[0].length == 1 ? t[k] : t[k].toString().padStart(m[0].length, 0));
            }
        }
    }
    return exp;
};

// 获取当前任务的工作目录
const TaskDir = process.cwd();

// 定义脚本常量
const SOURCES_DIR = 'sources';
const PACKAGES_DIR = 'packages';

(async () => {
    console.log('TaskDir', TaskDir);
    var updateCommit = [];

    // 获取所有 JSON 文件
    const files = fs.readdirSync(SOURCES_DIR).filter(file => file.endsWith('.json'))
        .map(file => path.join(SOURCES_DIR, file));

    // 检查更新
    for (const file of files) {
        // 读取json内容
        let json = JSON.parse(fs.readFileSync(file, 'utf-8'));
        // 获取远程版本号
        var content = '';
        try {
            content = await fetch(json.checkver.url).then(res => res.text());
        } catch (e) {
            console.error(`Failed: ${json.checkver.url}\n`, e.message);
            continue;
        }
        if (!content) continue;
        const pattern = new RegExp(json.checkver.regex || '(.*)');
        const matches = content.match(pattern);
        // 比较版本
        if (json.version === matches[1]) continue;
        let updateLine = `${file.match(/([^/\\]+).json$/)[1]}: ${json.version} -> ${matches[1]}`;
        console.log(updateLine);

        // 更新版本号
        json.version = matches[1];

        // 下载更新文件
        let isUpdated = false;
        for (const fpath of json.filelist) {
            let url = fpath.replace('$version', matches[1]);
            for (const key in matches.groups) {
                url = url.replace(`$${key}`, matches.groups[key]);
            }

            const destPath = path.join(PACKAGES_DIR, url.match(/[^/\\]+$/)[0]);
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HttpStatus(${response.status})`);
                }
                // 将响应内容读取为 ArrayBuffer
                const arrayBuffer = await response.arrayBuffer();
                // 将 ArrayBuffer 转换为 Buffer
                const buffer = Buffer.from(arrayBuffer);
                // 写入文件
                fs.writeFileSync(destPath, buffer);
                console.log('Update:', url);
                isUpdated = true;
            } catch (err) {
                console.error(`Failed: ${url}`, err.message);
            }
        }

        // 保存更新后的 JSON
        if (isUpdated) {
            updateCommit.push(updateLine);
            fs.writeFileSync(file, JSON.stringify(json, null, 4), 'utf-8');
        }
    }

    // 提交更新日志
    if (updateCommit.length) {
        const timestamp = new Date().format("yyyy-MM-dd hh:mm:ss");
        updateCommit.unshift(timestamp);
        const logPath = 'README.md';
        var update_history = fs.readFileSync(logPath, 'utf-8');
        update_history = updateCommit.join('\n    ') + '\n' + update_history;
        fs.writeFileSync(logPath, update_history, 'utf-8');
        fs.writeFileSync('commit.txt', timestamp, 'utf-8');
    }
})();
