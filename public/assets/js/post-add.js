// 查询分类列表
$.ajax({
    type: "get",
    url: "/categories",
    success: function(response) {
        let html = template('categoryTpl', { response })
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

// 获取当前浏览器地址栏中的id
let id = getUrlParams("id");
// 当前管理员在做文章想详情修改
if (id != -1) {
    // 根据id获取文章详情
    $.ajax({
        type: "get",
        url: "/posts/" + id,
        success: function(response) {
            $.ajax({
                type: "get",
                url: "/categories",
                success: function(categories) {
                    response.categories = categories;

                    let html = template('modifyTpl', response);

                    $("#parentBox").html(html);
                }
            });
        }
    });
}

// 从浏览器的地址栏中获取参数 传name返回对应值
function getUrlParams(name) {
    let paramsAry = location.search.substr(1).split('&');
    // 循环数据
    for (let i = 0; i < paramsAry.length; i++) {
        let tme = paramsAry[i].split("=");
        if (tme[0] == name) {
            return tme[1];
        }
    }
    // 没有参数返回 -1
    return -1;
};

// 修改信息表单发生提交的时候
$("#parentBox").on('submit', 'form', function() {
    // 获取管理员在表单输入的内容
    let formData = $(this).serialize();
    // 获取当前文章id
    let id = $(this).attr("data-id");

    // 发送修改请求
    $.ajax({
        type: "put",
        url: "/posts/" + id,
        data: formData,
        success: function(response) {
            location.href = "/admin/posts.html"
        }
    });
    return false;
});