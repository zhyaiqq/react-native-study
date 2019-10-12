# react-native中如何使用typscript

#### 1. 在已经创建的react-native项目中引入typesscript
```
yarn add --dev typescript
yarn add --dev react-native-typescript-transformer
yarn tsc --init --pretty --jsx react
touch rn-cli.config.js
yarn add --dev @types/react @types/react-native
```

执行以上命令后，在`tsconfig.json`文件中取消一下注释
```
{
  /* Search the config file for the following line and uncomment it. */
  // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
}
```

在`rn-cli.config.js`文件中，添加下面代码
```
module.exports = {
  getTransformModulePath() {
    return require.resolve('react-native-typescript-transformer');
  },
  getSourceExts() {
    return ['ts', 'tsx'];
  },
};
```

#### 2. 在创建一个新的基于typescript的react-native项目
```
react-native init MyAwesomeProject --template typescript
```

使用这种方式的时候安装的是react-native 0.61.*版本的，不知道为啥xcode跑不起来，andorid studio可以

[参考资料](https://facebook.github.io/react-native/blog/2018/05/07/using-typescript-with-react-native)


# 其他

在这里demo里面还尝试使用了react-navigation和react-native-svg

react-navigation官网已经到4.x版本，我还是用的熟悉的3.x版本，4.x版本使用还是有差异，没具体研究了

封装了路由配置和svg图标的使用，具体看文件`src/Router.js` `src/components/svg.tsx`

`src/components/svg.tsx`文件里面有一个ts验证问题，不知道咋处理