// 当选择logo图片时
$("#logo").on('change', function() {
    // 获取管理员选择到的图片
    let file = this.files[0];
    // 创建FormData对象实现文件二进制上传
    let formData = new FormData();
    // 图片追加到FormData
    formData.append('logo', file)

    // 向服务器发送请求实现文件上传
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            console.log(response);
            $("#hiddenLogo").val(response[0].logo);
            // 将logo图片显示在页面中
            $("#preview").prop('src', response[0].logo)
        }
    });
});

// 当网站设置表单发生提交时
$("#settingsForm").on('submit', function() {

    // 获取管理员在表单填写内容
    let formData = $(this).serialize();

    // 向服务器发送设置请求
    $.ajax({
        type: "post",
        url: "/settings",
        data: formData,
        success: function(response) {
            location.reload();
        }
    });

    // 阻止表单默认提交
    return false;
})