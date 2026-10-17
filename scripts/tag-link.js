/** 
 * hexo-tag-link.js
 *
 * @version 240613
 * @description 生成多个可带有注解的链接
 * @author 纸鹿本鹿 <hi@zhilu.cyou>
 * @license WTFPL
 */

const parseInput = (args, content) => {
  const wrapperClass = args[0] || 'alist';
  const pattern = /^\[(.*?)\]\((.*?)\)(?:\{(.*?)\})?$/;
  const lines = content.split('\n');
  const links = [`<div class="${wrapperClass}">`];

  lines.forEach(line => {
    const match = line.match(pattern);
    if (match) {
      const [_, text, link, subText = ''] = match;
      // 标记为自定义组件，避免主题将其作为普通正文链接再添加 Link 图标。
      links.push(`<a class="multi-link" href="${link}" data-sub="${subText}">${text}</a>`);
    }
  });

  links.push('</div>');
  return links.join('\n');
};

hexo.extend.tag.register('multi_link', parseInput, { ends: true });
