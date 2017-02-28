$(function(){
  // 关闭浮层
  $('.actClose').click(function(){
    $(this).parents('.G-layerWrap').hide()
  })
  $('.actAddPath').click(function(){
    $('.addPathLayer').parents('.G-layerWrap').show()
  })
  // 删除
  $('.actDelItem').click(function(e){
    // 获取节点及ID
    var id = $(e.target).data('id')
    var itemNode = $('#item-' + id)
    var childNode = $('.parent-' + id)
    // 打印节点及数据
    // console.log(id,itemNode,childNode)

    // 异步发送删除数据的请求
    $.ajax({
      type: 'DELETE',
      url: '/admin/path/list?id=' + id
    })
    .done(function(res) {
      if (res.code === 1) {
        if (itemNode.length > 0) {
          alert('删除成功')
          itemNode.remove()
          childNode.remove()
        }
      } else {
        alert(res.msg)
      }
    })
  })
  // 新增子类
  $(".actAddSubItem").click(function(e){
    var target = $(e.currentTarget);
    var actData = $.queryToJson(target.attr("actdata"));
    console.log(actData)
    $('.parentId').val(actData.parentId)
    $('.parentName').val(actData.parentName).text(actData.parentName+'/')
    $('.level').val(actData.level).text(actData.level)
    $('.grandId').val(actData.grandId)
    $('.grandName').val(actData.grandName)
    $('.addSubPathLayer').parents('.G-layerWrap').show()
  })

})
