# Yunhao Hu · Nocturne

黑金钢琴主题中英双语个人网站。HTML、CSS 和原生 JavaScript，无需安装依赖或构建。

## 预览

双击 `index.html` 即可浏览，包括语言切换。也可在此目录运行 `python -m http.server 8000`，访问 `http://localhost:8000`。

## 部署到 GitHub Pages

1. 登录 `ghostfox-cs` 账号，打开或创建名为 `ghostfox-cs.github.io` 的仓库。若已有网站，请先备份现有文件。
2. 将此文件夹中的 `index.html`、`styles.css`、`script.js` 上传至仓库根目录，不要再套一层文件夹。`README.md` 与 `tests/` 可选。
3. 打开仓库 **Settings → Pages**，在 **Build and deployment** 选择 **Deploy from a branch**。
4. 选择实际保存这些文件的分支（通常为 `main`），目录选 **/(root)**，保存。
5. 等待 GitHub 显示发布成功后，访问 https://ghostfox-cs.github.io/ 。本交付未向 GitHub 推送文件，未修改线上网站。

官方说明：https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 更新内容

英文内容直接写在 `index.html`。对应中文位于同一元素的 `data-zh` 属性，修改时请同时维护两种语言。`script.js` 负责切换与记忆语言、手机菜单与导航状态。颜色、字体和手机布局位于 `styles.css`。全部字体使用系统字体，页面不依赖第三方字体或图片请求。

内容依据提供的中英文简历整理；港大教育日期按照简历列示，未推定当前学籍状态。联系方式包含已提供的 GitHub、LinkedIn 和简历邮箱；未打包签证、录取信或原始简历。

## 检查

如安装了 Node.js，可运行 `node --test tests/site.test.mjs`。实际浏览器检查应覆盖中文、英文、320/768/1440 像素宽度、键盘导航与禁用 JavaScript 的英文回退。
