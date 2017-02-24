$(function(){
  // 关闭浮层
  $('.actClose').click(function(){
    $(this).parents('.G-layerWrap').hide()
  })
  $('.actAddPath').click(function(){
    $('.addPathLayer').parents('.G-layerWrap').show()
  })
  // 删除
  $('.actDelParent').click(function(e){
    // 获取节点及ID
    var id = $(e.target).data('id')
    var table = $('.item-id-' + id)
    // 打印节点及数据
    // console.log(id,table)

    // 异步发送删除数据的请求
    $.ajax({
      type: 'DELETE',
      url: '/admin/path?id=' + id
    })
    .done(function(res) {
      if (res.code === 1) {
        if (table.length > 0) {
          alert('删除成功')
          table.remove()
        }
      } else {
        alert(res.msg)
      }
    })
  })
})
