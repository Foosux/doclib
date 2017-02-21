/**
 * 后台-用户管理
 */
$(function(){
  $('.actClose').click(function(){
    $(this).parents('.G-layerWrap').hide()
  })
  $('.actAddUser').click(function(){
    $('.G-layerWrap').show()
  })
})
