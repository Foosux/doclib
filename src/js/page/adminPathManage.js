$(function(){
  // 关闭浮层
  $('.actClose').click(function(){
    $(this).parents('.G-layerWrap').hide()
  })
  $('.actAddPath').click(function(){
    $('.addPathLayer').parents('.G-layerWrap').show()
  })
})
