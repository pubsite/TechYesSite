/** 
 * console.js
 *
 * @version 240812
 * @description 控制台美化输出。
 * @author 纸鹿本鹿 <hi@zhilu.cyou>
 * @license WTFPL
 */

'use strict';

/** log 类型对应的颜色表
 * 
 * @description 命名时应当避免与原生console的方法冲突
 */
const typeColor = {
    primary: '#37f',
    info: '#778',
    // 输出调用堆栈，但是默认折叠
    more: '#c58',
    // 输出调用堆栈
    trace: '#e58',
    success: '#5b5',
    // 输出警告
    warn: '#e83',
    danger: '#e75',
    // 输出错误
    error: '#d55',
};

/** 控制台打印函数
 * 
 * @description 用于输出不同类型的日志信息。
 * 
 * @param {string} type - 日志类型/CSS颜色值，决定日志的显示样式和颜色。默认为'info'。
 * @param {string} title - 标签标题，将在日志输出中作为突出显示的部分。
 * @param {string} text - 标签文本，可选参数，会将标签标题向左弹出到标签的高亮部分。传入假值时可跳过。
 * @param {string} content - 日志正文，可选参数，用于提供额外的日志信息。
 */
const logCustom = (type = 'info', title = '', text = '', content = '') => {
    const color = typeColor[type] || type || typeColor.info;
    const logArgs = [
        `%c ${text ? title : type.toUpperCase()} %c ${text || title} %c ${content ? `\n${content}` : ''}`,
        `background: ${color}; border: 1px solid ${color}; padding: 2px; border-radius: 4px 0 0 4px; color: #fff;`,
        `margin-bottom: 4px; border:1px solid ${color}; padding: 2px; border-radius: 0 4px 4px 0; color: ${color};`,
        ``,
    ];
    if (type === 'more') {
        console.groupCollapsed(...logArgs);
        const callStack = new Error();
        callStack.name = '调用堆栈';
        console.log(callStack.stack);
        console.groupEnd();
    } else {
        console[type in console ? type : 'log'](...logArgs);
    }
};

/**
 * 提供便捷的日志方法集合，封装了`logCustom`的功能，支持多种预设的日志类型。
 *
 * @property {Function} info - 输出信息日志。
 * @property {Function} warn - 输出警告日志。
 * @property {Function} error - 输出错误日志。
 * // 更多类型...
 * @property {Function} custom - 自定义类型日志，允许指定颜色。
 *
 * @example
 * log.info('脚本运行', 'script.js', lines(
 *   `路径：${document.currentScript.src}`,
 * ));
 */
const log = Object.keys(typeColor).reduce((methods, type) => {
    methods[type] = (title, text, content) => logCustom(type, title, text, content);
    return methods;
}, {
    custom: (color, title, text, content) => logCustom(color, title, text, content),
    // 测试
    test: () => {
        Object.keys(typeColor).forEach(type => log[type](type, typeColor[type]));
        log.custom('rgb(255 127 0 / 60%)', '自定义颜色', 0, lines(
            '和附加的',
            '多个段落',
        ));
    }
});

/**
 * 拼接多个字符串参数为一个单一的字符串，各参数间以换行符分隔。
 * 此函数简化了创建多行字符串的过程，特别适用于构造多行日志消息或文档字符串。
 *
 * @param {...string} lines - 一系列字符串参数，将被拼接成一个含有换行的新字符串。
 * @returns {string} 返回一个由输入参数串联而成的字符串，每项参数后跟一个换行符。
 *
 * @example
 * log.info('标签标题', '标签文本', lines(
 *     '第一行内容',
 *     '第二行内容',
 * ));
 */
const lines = (...lines) => lines.join('\n');

log.info('Proudly using', 'console.js', lines(
    `👉 Try log.test() and see the output`,
    `🔍 Check it at ${document.currentScript.src}`,
));
// testLog();

/**
 * 在下方编写你的控制台日志输出。
 */

// 若在其他文件中调用
// if (typeof log === 'undefined') log = console;

log.primary('野生技协', 'thisis.host');
const cssTags = document.querySelectorAll('[data-css-type=css-patch]');
const toggleThemePatch = () => {
    // '' 启用，'none' 停用
    const toMedia = cssTags[0].media === '' ? 'none' : '';
    const logType = toMedia === '' ? 'success' : 'danger';
    const logText = toMedia === '' ? '启用' : '停用';
    cssTags.forEach(cssTag => (cssTag.media = toMedia));
    log[logType]('主题修补', logText, lines(cssTags[0].href, cssTags[1].href, cssTags[2].href));
};

log.info('主题修补', 'patch.css', lines(
    '💡 试试用 toggleThemePatch() 预览 Patch 的启停效果',
    `🎨 封面/文章样式：${cssTags[0].href}`,
    `🎨 侧边栏样式：${cssTags[1].href}`,
    `🎨 Twikoo 评论区样式：${cssTags[2].href}`,
));