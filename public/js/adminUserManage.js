/**
 * 后台-用户管理
 */
$(function(){
  // 关闭浮层
  $('.actClose').click(function(){
    $(this).parents('.G-layerWrap').hide()
  })
  // 增加用户
  $('.actAddUser').click(function(){
    $('.G-layerWrap').show()
  })
  // 删除
  $('.actDel').click(function(e){
    // 获取节点及ID
    var id = $(e.target).data('id')
    var tr = $('.item-id-' + id)
    // 打印节点及数据
    // console.log(id,tr)

    // 异步发送删除数据的请求
    $.ajax({
      type: 'DELETE',
      url: '/admin/user?id=' + id
    })
    .done(function(res) {
      if (res.code === 1) {
        if (tr.length > 0) {
          tr.remove()
          alert('删除成功')
        }
      } else {
        alert(res.msg)
      }
    })

  })
})
