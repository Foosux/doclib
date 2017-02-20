var fs = require("fs")
var path = require("path")
//配置远程路径
var remotePath = ""
//获取当前目录绝对路径，这里resolve()不传入参数
var rootPath = path.resolve()
// 文档更目录
var docsRoot = path.join(rootPath, 'docs')
//读取文件存储数组
var fileHtmlArr = []
// 记录文件属性
var fileInfoArr = []

//读取文件目录
function readFile(searchPath, savePath, includeName) {
  var files = fs.readdirSync(searchPath)
  // 获取文件长度，用于判断是否文件夹内最后一个元素
  var count = files.length
  // console.log(count)
  // 获取相对路径
  var relativePath = path.relative(docsRoot, searchPath)
  // console.log(docsRoot, '\n',searchPath ,'\n', relativePath)
  // 文件分类及排序
  var sortFilesJson = fileSort(files)
  // console.log(sortFilesJson)
  // 遍历输出
  sortFilesJson.filesArr.forEach(function (filename,i) {
    //docsRoot+"/"+filename不能用/直接连接，Unix系统是”/“，Windows系统是”\“
    var stats = fs.statSync(path.join(searchPath, filename))
    if (stats.isFile()) {
      if (path.extname(filename) == '.md') {
        // 记录元数据
        var statInfo = {
          fileName: path.basename(filename, '.md'),
          path: relativePath,
          birthtime: stats.birthtime,
          modifytime: stats.mtime,
          author: '',
          description: '',
          despic: ''
        }
        fileInfoArr.push(statInfo)
        // 补充ol结构的结尾部分
        // 没有嵌套结构的最后一个 dd 需要补充前面的 ol(嵌套多少层补充多少个)
        var lastHtml=''
        if (sortFilesJson.dirCount==0 && i==count-sortFilesJson.dirCount-1) {
          for(var i=1; i<=relativePath.split('/').length; i++){
            lastHtml += '</ol>'
          }
        } else {
          lastHtml = ''
        }
        // 生成HTML
        var newLink = '<dd><a href="/md/'
          + path.basename(filename,'.md')
          + '?path='+relativePath+'">'
          + path.basename(filename,'.md')
          + '</a></dd>'+lastHtml
        fileHtmlArr.push(newLink)
        writeFile(fileHtmlArr, savePath, includeName, filename)
      }
    } else if (stats.isDirectory()) {
      var newDir =  '<ol><dt>'+filename+'</dt>'
      fileHtmlArr.push(newDir)
      writeFile(fileHtmlArr, savePath, includeName, filename)
      // 遍历子目录
      readFile(path.join(searchPath, filename), savePath, includeName)
    }
  })
}

// 排序、文件夹放置在最后、计算文件夹个数
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
function writeFile(data, savePath, includeName, failname){
  var data = data.join("\n")
  fs.writeFile(path.join(savePath, (includeName+'.jade')), data+'\n', function(err){
      if(err) throw err
      console.log('写入'+failname+'成功!')
  })
}

// 包裹
function readAllFile (searchPath, savePath, includeName) {
  // 执行生成目录及元数据
  readFile(searchPath, savePath, includeName)
  return fileInfoArr
}

module.exports = readAllFile
