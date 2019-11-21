### 新建demo3的目的

因为万能遥控模板运行不起，就新建了一个跟它react-native 0.59.9的项目，这个可以运行，然后把`node_modules/react-native`拷贝到万能遥控中就运行成功了


### 提出问题
1. 为什么每次初始化一个项目都可以运行成功，但是安装一些库（如`react-navigation` `react-native-svg`）后就运行不成功了 ???


### 内容
- `src/components/refreshListView.js`里面梳理了一下封装refreshListView组件的逻辑