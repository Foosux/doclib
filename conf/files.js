var fs = require("fs")
// path模块，可以生产相对和绝对路径
var path = require("path")
//配置远程路径
var remotePath = ""
//获取当前目录绝对路径，这里resolve()不传入参数
var rootPath = path.resolve()
// 文档更目录
var docsRoot = path.join(rootPath, 'docs')
//读取文件存储数组
var fileArr = []

//读取文件目录
function readFile(searchStartPath) {
  var files = fs.readdirSync(searchStartPath)
  // 获取文件长度，用于判断是否文件夹内最后一个元素
  var count = files.length
  // 用于存储元数据
  var results = {}
  var relativePath = path.relative(docsRoot, searchStartPath)
  // console.log(docsRoot, '\n',searchStartPath ,'\n', relativePath)
  // 文件分类及排序
  var sortFiles = fileSort(files, searchStartPath)
  // 遍历
  sortFiles.forEach(function (filename) {
    //docsRoot+"/"+filename不能用/直接连接，Unix系统是”/“，Windows系统是”\“
    var stats = fs.statSync(path.join(searchStartPath, filename))
    //文件
    if (stats.isFile()) {
      if (path.extname(filename) == '.md') {
        var newLink='<dd><a href="/md/'+path.basename(filename,'.md')+'?path='+path.join('',relativePath)+''+'">'+path.basename(filename,'.md') +'</a></dd>'
        fileArr.push(newLink)
        writeFile(fileArr,filename)
      }
    } else if (stats.isDirectory()) {
      var newDir = '<dt>'+filename+'</dt>'
      fileArr.push(newDir)
      writeFile(fileArr,filename)
      // 遍历子目录
      readFile(path.join(searchStartPath,filename))
    }
  })
}

// 排序 文件夹放置在最后
function fileSort (files) {
  var filesArr = files
  files.forEach(function (filename,i) {
    if (!path.extname(filename)) {
      var del = filesArr.splice(i,1)
      filesArr.push(del[0])
    }
  })
  return filesArr
}


// 写入到filelisttxt文件
function writeFile(data,failname){
  var data = data.join("\n")
  fs.writeFile(rootPath+"/"+"filelist.jade",data+'\n',function(err){
      if(err) throw err
      console.log('写入'+failname+'成功!')
  })
}
// 执行生成目录
readFile(docsRoot)
