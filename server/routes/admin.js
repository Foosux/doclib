var express = require('express')
var path = require('path')
var router = express.Router()
var multer = require('multer')
var upload = multer({dest: path.join(path.resolve(), './dest/images/avatar/')})
var fileManage = require(path.join(path.resolve(), './lib/fileManage'))
var dirManage = require(path.join(path.resolve(), './lib/dirManage'))
var userManage = require('../datebase/userManage')
var pathManage = require('../datebase/pathManage')
var docsManage = require('../datebase/docsManage')


router.route('/')
  .get(function (req, res, next) {
    res.render('adminHome', {
    })
  })
router.route('/:subPath')
  .get(function (req, res, next) {
    var subPath = req.params.subPath
    switch (subPath) {
      case 'home':
        res.render('adminHome', {
          subPath: subPath
        })
        break
      case 'new':
        pathManage.fetch(function (data) {
          res.render('adminNew', {
            subPath: subPath,
            data: data
          })
        })
        break
      case 'user':
        userManage.fetch(function (data) {
          res.render('adminUserManage', {
            subPath: subPath,
            data: data
          })
        })
        break
      case 'path':
        pathManage.fetch(function (data) {
          res.render('adminPathManage', {
            subPath: subPath,
            data: data.length ? pathManage.format(data) : {maxDeep: 0, lv1: {}}
          })
        })
        break
      case 'tag':
        res.render('adminTagManage', {
          subPath: subPath
        })
        break
    }
  })

// 创建用户
router.route('/user/creatUser')
  .post(upload.single('avatar'), function (req, res, next) {
    // 拼装图片信息
    req.body.avatar = path.join('/', path.relative('dest', req.file.path))
    // console.log(req.body,'\n')
    userManage.creat(req.body, function (msg) {
      // console.log(msg)
      if (msg) {
        res.redirect('/admin/user')
      }
    })
  })
// 删除用户
router.route('/user')
  .delete(function (req, res, next) {
    var id = req.query.id
    if (id) {
      userManage.remove(id, function (resData) {
        res.json(resData)
      })
    } else {
      res.json({
        code: 0,
        msg: '请求数据缺少ID参数'
      })
    }
  })
// 创建分类
router.route('/path/creat')
  .post(function (req, res, next) {
    var reqBody = req.body || {}
    pathManage.creat(reqBody, function (reqData) {
      // console.log(reqData)
      if (reqData.code === 1) {
        dirManage.mkdir(path.join(global._CONF.docsRoot, reqBody.grandName, reqBody.parentName, reqBody.pathName))
        res.redirect('/admin/path')
      } else {
        console.log(reqData.msg)
      }
    })
  })

router.route('/path/list')
  // 获取数据
  .get(function (req, res, next) {
    var id = req.query.id
    if (id != 'undefined') {
      pathManage.fetchByIdComb(id, function (resData) {
        res.json(resData)
      })
    } else {
      res.json({
        code: 0,
        msg: '请求数据缺少ID参数'
      })
    }
  })
  // 删除分类
  .delete(function (req, res, next) {
    var id = req.query.id
    if (id != 'undefined') {
      pathManage.fetchById(id, function (resData) {
        var data = resData.data[0]
        var parentName = data.parentName || '/'
        var grandName = data.grandName || '/'
        var curPath = path.join(global._CONF.docsRoot, grandName, parentName, data.pathName)
        dirManage.rmdir(curPath)
        // 删除该记录
        pathManage.remove(id, function (resData) {
          res.json(resData)
        })
      })
    } else {
      res.json({
        code: 0,
        msg: '请求数据缺少ID参数'
      })
    }
  })

// 发布文章
router.route('/new/creat')
  .post(function (req, res, next) {
    // 整理数据
    req.body.author = global._GLOBAL_DATA.role
    req.body.avatar = global._GLOBAL_DATA.avatar
    // console.log(req.body)

    docsManage.creat(req.body, function (resData) {
      if (resData.code === 1) {
        // console.log(resData)
        var filePath = global._CONF.docsRoot
        resData.data.paths.forEach(function (item) {
          filePath = path.join(filePath, item)
        })
        filePath = path.join(filePath, (resData.data.title + '.md'))
        fileManage.creatFile(filePath, resData.data.article)
        // res.redirect('/admin/home')
      }
    })
  })

module.exports = router
