// 查询分类列表
$.ajax({
    type: "get",
    url: "/categories",
    success: function(response) {
        console.log(response);
        let html = template('categoryTpl', { data: response })
        $("#category").html(html);
    }
});

// 当管理员选择文件时
$("#feature").on('change', function() {

    // 获取管理员选择到的文件
    let file = this.files[0];

    // 创建FormData对象 实现二进制文件上传
    let formData = new FormData();

    // 将管理员选择到的文件添加到forData对象中
    formData.append('cover', file);

    // 实现文章封面上传
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        // 不处理forData参数
        processData: false,
        // 不设置参数类型
        contentType: false,
        success: function(response) {
            console.log(response);
            $("#thumbnail").val(response[0].cover)
        }
    });

});

// 当添加表单提交的时候
$("#addForm").on('submit', function() {

    // 获取管理员在表单输入参数
    let formData = $(this).serialize();
    console.log(formData);

    // 向服务器发送添加文章请求
    $.ajax({
        type: "post",
        url: "/posts",
        data: formData,
        success: function(response) {
            // 刷新网页
            location.href = '/admin/posts.html';
        }
    });

    // 阻止表单默认行为
    return false;
});