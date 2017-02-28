/**
 * readFilesCreatMenu.creat(sourcePath, tplSavePath, tplNames)
 * @type {sourcePath [string]} 读取哪个路径下的文件
 * @type {tplSavePath [string]} 生成的侧边栏信息保存在哪
 * @type {tplNames [string]} 保存的文件名
 */
var fs = require('fs')
var path = require('path')

var readFilesCreatMenu = {
  creat: function (sourcePath, tplSavePath, tplName) {
    // 执行生成目录及元数据
    this._readFile(sourcePath, tplSavePath, tplName)
    return this._filesInfo
  },
  // 储存需要写入的文件内容；储存文件元信息
  _fileHtmlArr: [],
  _filesInfo: [],
  // 提取文件信息
  _readFile: function (sourcePath, tplSavePath, tplName, lastDir) {
    var __this = this
    var __files = fs.readdirSync(sourcePath)
    // 获取相对路径
    var __relativePath = path.relative(global._CONF.docsRoot, sourcePath)
    // console.log(global._CONF.docsRoot, '\n',sourcePath ,'\n', __relativePath)
    // 文件分类及排序
    var __filesSortInfo = __this._filesFormat(__files)
    // console.log(__filesSortInfo)
    // 获取深度，合格文件个数
    var __depth = __relativePath.split('/').length
    var __fileCount = __filesSortInfo.filesArr.length
    // 补全HTML 2+级的最后一个空目录根据深度补全ol；2+级不是最后一个的空目录需要补全自身的ol
    if (__fileCount === 0 && __depth > 0 && lastDir) {
      // console.log('空文件夹: yes, 内部循环: yes, 上级是最后一个文件夹: yes')
      var __overTag = ''
      for (var n = 1; n < __depth; n++) {
        __overTag += '</ol>'
      }
      __this._fileHtmlArr.push(__overTag)
      __this._writeFile(__this._fileHtmlArr, tplSavePath, tplName, 'ol')
    } else if (__fileCount === 0 && __depth > 0) {
      // console.log('空文件夹: yes, 内部循环: yes, 上级是最后一个文件夹: no')
      __this._fileHtmlArr.push('</ol>')
      __this._writeFile(__this._fileHtmlArr, tplSavePath, tplName, 'ol')
    }
    // 遍历输出
    __filesSortInfo.filesArr.forEach(function (filename, index) {
      //global._CONF.docsRoot+"/"+filename不能用/直接连接，Unix系统是”/“，Windows系统是”\“
      var __stats = fs.statSync(path.join(sourcePath, filename))
      if (__stats.isFile()) {
        if (path.extname(filename) === '.md') {
          // 记录元数据
          var _statInfo = {
            title: path.basename(filename, '.md'),
            description: '',
            paths: __relativePath.split('/'),
            tags: [],
            article: '',
            meta: {
              createAt: __stats.birthtime,
              updateAt: __stats.mtime,
              author: global._GLOBAL_DATA.role || '',
              avatar: global._GLOBAL_DATA.avatar || ''
            }
          }
          __this._filesInfo.push(_statInfo)
          // 没有嵌套结构的最后一个 dd 需要补充前面的 ol;
          // 如果恰好是最后一个目录的最后一个dd，则需根据层级补全(嵌套多少层补充多少个)
          var __lastHtml = ''
          if (__filesSortInfo.dirCount === 0 && index === __filesSortInfo.fileCount - 1 && lastDir) {
            // console.log('最后一层: yes, 最后一个md: yes, 上级是最后一个dir: yes ')
            for (var i = 1; i <= __depth; i++) {
              __lastHtml += '</ol>'
            }
          } else if (__filesSortInfo.dirCount === 0 && index === __filesSortInfo.fileCount - 1) {
            // console.log('最后一层: yes, 最后一个md: yes, 上级是最后一个dir: no ')
            __lastHtml = '</ol>'
          }
          // 生成HTML
          var __newDD = '<dd><a href="/md/' +
            path.basename(filename, '.md') +
            '?path=' + __relativePath + '">' +
            path.basename(filename, '.md') +
            '</a></dd>' + __lastHtml
          __this._fileHtmlArr.push(__newDD)
          __this._writeFile(__this._fileHtmlArr, tplSavePath, tplName, filename)
        }
      } else if (__stats.isDirectory()) {
        var __newDT = '<ol><dt>' + filename + '</dt>'
        __this._fileHtmlArr.push(__newDT)
        __this._writeFile(__this._fileHtmlArr, tplSavePath, tplName, filename)
        // 遍历子目录，最后一个目录需增加标识
        if (index === __fileCount - 1) {
          // console.log('本级最后一个dir: yes ')
          __this._readFile(path.join(sourcePath, filename), tplSavePath, tplName, true)
        } else {
          __this._readFile(path.join(sourcePath, filename), tplSavePath, tplName)
        }
      }
    })
  },
  // 排序-文件夹放置在最后,计算文件夹个数及文件个数
  _filesFormat: function (files) {
    // 过滤文件
    var __files = files.filter(function (item) {
      return path.extname(item) === '.md' || (!path.extname(item) && item !== '.DS_Store')
    })
    // console.log(__files)
    var __filesArr = [],
        __dirCount = 0,
        __fileCount = 0
    __files.forEach(function (filename, i) {
      if (!path.extname(filename)) {
        __dirCount++
        __filesArr.push(filename)
      } else {
        __fileCount++
        __filesArr.unshift(filename)
      }
    })
    // console.log(__filesArr, 'dir:' + __dirCount, 'file:' + __fileCount)
    return {
      filesArr: __filesArr,
      dirCount: __dirCount,
      fileCount: __fileCount
    }
  },
  // 文件写入
  _writeFile: function (data, tplSavePath, tplName, filename) {
    var __writeData = data.join('\n')
    fs.writeFileSync(path.join(tplSavePath, tplName), __writeData)
    console.log('写入' + filename + '成功!')
  }
}

module.exports = readFilesCreatMenu
