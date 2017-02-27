$(function(){
  // 分类3级联动
  $('#lv-1, #lv-2').change(function(e){
    var id = $(e.target).find('option:selected').data('id')
    var tarId = parseInt($(e.target).attr('id').split('-')[1])
    getOptions(id, function (opts) {
      if (tarId==1) {
        $('#lv-'+(tarId+1)+',#lv-'+(tarId+2)).hide()
      }
      $('#lv-'+(tarId+1)).html(opts).show()
    })
  })
  // 返回options信息
  function getOptions (id, cb) {
    var optsStr = '<option value=""> 无 </option>'
    $.ajax({
      type: 'get',
      url: '/admin/path/list?id=' + id
    })
    .done(function(res) {
      if (res.code === 1) {
        for (var i=0; i<res.data.length; i++) {
          if (res.data[i].parentId == id) {
            optsStr += '<option value="'+res.data[i].pathName+'" data-id="'+res.data[i]._id+'">'+res.data[i].pathName+'</option>'
          }
        }
        cb(optsStr)
      } else {
        $('#lv-2,#lv-3').hide()
        console.log(res.msg)
      }
    })
  }
  // 新增Tag
  $('.actAddTag').on('click',function(){
    var tagHtml = '<span class="tag"><input type="text" name="tags" required/><i>x</i></tag>'
    $('#tagsWrap').append(tagHtml)
    $('#tagsWrap .tag:last-child input').focus()
  })
  $('#tagsWrap').on('click','i',function(){
    $(this).parents('.tag').remove()
  })
})
