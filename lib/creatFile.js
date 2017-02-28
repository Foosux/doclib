/**
 * 发布文章时进行md储存
 */
var fs = require("fs")
var path = require("path")

// function creatFile (req) {
//   var fileName = req.title+'.md'
//   var paths = ''
//   var article = req.article
//   req.paths.forEach(function(item){
//     paths += '/'+item
//   })
//   var savePath = path.join(docsRoot, paths, fileName)
//   console.log(savePath, paths, article)
//   writeFile(savePath, article, fileName)
// }

function creatFile(savePath, data, filename){
  if (fs.existsSync(savePath)) {
    console.log('已存在')
  } else {
    console.log('不存在')
  }
  // fs.mkdirSync(savePath)
  // fs.writeFile(savePath, data, 'utf-8', function(err){
  //     if(err) throw err
  //     console.log('写入'+filename+'成功!')
  // })
}
// writeFile('/Users/foosux/Desktop/doclib/docs/北京TTT', '123123123', 'test')
// /Users/foosux/Desktop/doclib/docs/北京Te/03_SPA总结.md
module.exports = creatFile
