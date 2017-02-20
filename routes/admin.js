var express = require('express')
var router = express.Router()

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
        res.render('adminHome',{
          subPath: subPath,
        })
        break
      case 'new':
        res.render('adminNew',{
          subPath: subPath,
        })
        break
      case 'user':
        res.render('adminUserManage',{
          subPath: subPath,
        })
        break
      case 'path':
        res.render('adminPathManage',{
          subPath: subPath,
        })
        break
      case 'tag':
        res.render('adminTagManage',{
          subPath: subPath,
        })
        break
    }
  })



module.exports = router
