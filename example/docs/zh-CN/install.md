## 安装

### 使用npm安装
安装
```bash
npm i <project-name> -S
yarn add <project-name>
```

### 使用script引入
:::tip
1、本项目执行`npm run build:lib`打包，在 **dist** 文件夹中生成 **lib**。

2、复制并引入 **lib** 中的`lib.js`和`index.css`到开发项目中。
:::
```html
<link rel="stylesheet" type="text/css" href="index.css">
<script src="lib.js"></script>
```
