var Doc = require('../models/doc')

var docA = new Doc({
  title: '第一个文档',
  friends: [1,2],
  author: 'Foosux',
  // name: {
  //   full : 'zhu min'
  // },
  noRegData: 'am'
})


// docA.meta.createAt.setMonth(5)
// docA.save(function(err,docA){
//   if (err) return console.error(err)
// })

// console.log(docA.id,docA)

// docA.save(function(err,docA){
  // if (err) return console.error(err)
  // docA.speak()
  // console.log(docA)
// })

// Doc.findDoc(function(err,allDoc){
//   if (err) return console.error(err)
//   console.log(allDoc.length)
// })



module.exports = docA
