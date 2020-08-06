// 当管理员选择文件时
$("#file").on('change', function() {
    // 用户选择到的文件
    let file = this.files[0];
    // 创建formData对象实现文件二进制上传
    let formData = new FormData();
    // 将管理员选择到的文件添加到formData对象中
    formData.append('image', file);
    // 向服务器发送请求实现文件上传、
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            $("#image").val(response[0].image)
        }
    });
});

// 当轮播图表单发生提交时
$("#slidesForm").on('submit', function() {

    // 获取管理员在表单输入的内容
    let formData = $(this).serialize()

    // 向服务器发送请求，添加轮播图
    $.ajax({
        type: "post",
        url: "/slides",
        data: formData,
        success: function(response) {
            location.reload();
        }
    });

    // 阻止表单默认提交
    return false;
});

// 向服务器发送请求 获取轮播图列表数据
$.ajax({
    type: "get",
    url: "/slides",
    success: function(response) {
        console.log(response);
        let html = template('slidesTpl', { data: response });
        $("#slidesBox").html(html);
    }
});

// 当删除按钮被点击时
$("#slidesBox").on('click', '.delete', function() {
    if (!confirm('您真的要删除吗？')) return;
    // 当前要删除的id
    let id = $(this).attr('data-id');

    // 向服务器发送请求 删除轮播图
    $.ajax({
        type: "delete",
        url: "/slides/" + id,
        success: function() {
            location.reload();
        }
    });
});