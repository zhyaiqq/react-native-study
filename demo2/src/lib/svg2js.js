//  getSvg.js
var fs = require('fs');
var path = require('path');
const _svgdir = process.argv[2]
const _svgFile = process.argv[3]
const svgDir = path.resolve(process.cwd(),  _svgdir || 'src/assets/svg');
const distSvgFile = path.resolve(process.cwd(), _svgFile || 'src/assets/svgs.js')

// 读取单个文件
function readfile(filename) {
  console.log("正在转换：",filename)
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(svgDir, filename), 'utf8', function(err, data) {
      if (err) reject(err);
      data = data.replace(/\<\!\-\- .* \-\-\>/g, '') // 去掉注释
      data = data.replace(/\<title\>.*\<\/title\>/g, '') // 去掉title
      data = data.replace(/\<style type="text\/css">[\s\S]*\<\/style>/g, '') // 去掉style
      data = data.replace(/\<path/g, '<path fill="#050505"') // 添加fill字段
      data = data.replace(/\<rect/g, '<rect fill="#050505"') // 添加fill字段
      data = data.replace(/\<circle/g, '<circle fill="#050505"') // 添加fill字段
      data = data.replace(/\<polygon/g, '<polygon fill="#050505"') // 添加fill字段
      resolve({
        [filename.slice(0, filename.lastIndexOf('.'))]: data,
      });
    });
  });
}

// 读取SVG文件夹下所有svg
function readSvgs() {
  return new Promise((resolve, reject) => {
   fs.readdir(svgDir, function(err, files) {
     if (err) reject(err);
     Promise.all(files.filter(filename => /\.svg$/.test(filename)).map(filename => readfile(filename)))
      .then(data => resolve(data))
      .catch(err => reject(err));
   });
  });
}

// 生成js文件
readSvgs()
  .then(data => {
    // console.log(data)
    let svgFile = 'export default ' + JSON.stringify(Object.assign.apply(this, data));
    fs.writeFile(distSvgFile, svgFile, function(err) {
      if(err) throw new Error(err);
      console.log('转换成功！')
    });
  }).catch(err => {
    throw new Error(err);
  });