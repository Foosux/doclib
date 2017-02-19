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
  // console.log(count)
  // 用于存储元数据
  var results = {}
  var relativePath = path.relative(docsRoot, searchStartPath)
  // console.log(docsRoot, '\n',searchStartPath ,'\n', relativePath)
  // 文件分类及排序
  var sortFilesJson = fileSort(files)
  // console.log(sortFilesJson)
  // 遍历
  sortFilesJson.filesArr.forEach(function (filename,i) {
    //docsRoot+"/"+filename不能用/直接连接，Unix系统是”/“，Windows系统是”\“
    var stats = fs.statSync(path.join(searchStartPath, filename))
    //文件
    if (stats.isFile()) {
      if (path.extname(filename) == '.md') {
        // 补充ol结构的结尾部分
        var lastHtml=''
        // 没有嵌套结构后的最后一个 dd 需要补充前面的 ol(嵌套多少层补充多少个)
        if (sortFilesJson.dirCount==0 && i==count-sortFilesJson.dirCount-1) {
          for(var i=1; i<=relativePath.split('/').length; i++){
            lastHtml += '</ol>'
          }
        } else {
          lastHtml = ''
        }
        var newLink = '<dd><a href="/md/'+path.basename(filename,'.md')+'?path='+relativePath+'">'+path.basename(filename,'.md') +'</a></dd>'+lastHtml
        fileArr.push(newLink)
        writeFile(fileArr,filename)
      }
    } else if (stats.isDirectory()) {
      // console.log(sortFilesJson.firstDirName)
      var newDir =  '<ol><dt>'+filename+'</dt>'
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
  var dirCount=0
  files.forEach(function (filename,i) {
    if (!path.extname(filename)) {
      dirCount++
      var del = filesArr.splice(i,1)
      filesArr.push(del[0])
    }
  })
  return {
    filesArr: filesArr,
    dirCount: (dirCount-1 >= 0) ? dirCount-1 : 0
  }
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
