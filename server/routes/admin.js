var express = require('express')
var path = require('path')
var router = express.Router()
var multer  = require('multer')
var upload = multer({ dest: path.join(path.resolve(),'./src/img/avatar/') })
var userManage = require('../datebase/userManage')



router.route('/')
  .get(function(req, res, next) {
    res.render('adminHome',{
    })
  })
router.route('/:subPath')
  .get(function(req, res, next) {
    var subPath = req.params.subPath
    switch (subPath) {
      case 'home':
        res.render('adminHome', {
          subPath: subPath,
        })
        break
      case 'new':
        res.render('adminNew', {
          subPath: subPath,
        })
        break
      case 'user':
        userManage.fetch(function(data){
          res.render('adminUserManage', {
            subPath: subPath,
            data: data
          })
        })
        break
      case 'path':
        res.render('adminPathManage', {
          subPath: subPath,
        })
        break
      case 'tag':
        res.render('adminTagManage', {
          subPath: subPath,
        })
        break
    }
  })

// 创建用户
router.route('/user/creatUser')
  .post(upload.single('avatar'), function (req, res, next) {
    // 拼装图片信息
    req.body.avatar = path.join('/',path.relative('src',req.file.path))
    // console.log(req.body,'\n')
    userManage.creat(req.body, function(msg){
      console.log(msg)
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

module.exports = router
