var Doc = require('../models/doc')

var docA = new Doc({
  title: '第一个文档',
  friends: [1,2],
  author: 'Foosux',
  // name: {
  //   full : 'zhu min'
  // },
  // noRegData: 'am'
})

// Doc.fetch(function(err,resDoc) {
//   if(err) {
//     console.log(err)
//   }
//   console.log(resDoc)
// })


// module.exports = Doc
module.exports = docA
