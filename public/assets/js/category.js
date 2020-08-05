// 监听分类表单提交行为
$("#addCategory").on("submit", function() {
    // 获取表单参数
    let formData = $(this).serialize();

    $.ajax({
        type: "post",
        url: "/categories",
        data: formData,
        success: function(response) {
            location.reload();
        }
    });

    // 阻止表单默认提交行为
    return false
});

// 向服务器请求分类数据
$.ajax({
    type: "get",
    url: "/categories",
    success: function(response) {
        let html = template('categoriesTpl', { data: response });
        $("#categoriesBox").html(html);
    }
});

// 为编辑按钮绑定点击事件
$("#categoriesBox").on('click', '.edit', function() {

    $.ajax({
        type: "get",
        url: "/categories/" + $(this).attr("data-id"),
        success: function(response) {
            let html = template('modifyCategoriesTpl', response)
            $("#categoryBox").html(html);
        }
    });

});

// 监听分类修改表单提交行为
$("#categoryBox").on("submit", "#modifyCategory", function() {

    // 获取管理员修改参数
    let formData = $(this).serialize();

    // 向服务器发送修改请求
    $.ajax({
        type: "put",
        url: "/categories/" + $(this).attr("data-id"),
        data: formData,
        success: function(response) {
            // 刷新页面
            location.reload();
        }
    });

    // 阻止表单默认提交行为
    return false
});

// 当删除按钮被点击时
$("#categoriesBox").on("click", ".delete", function() {
    if (!confirm('您确定要删除吗？')) {
        return;
    }

    // 获取id
    let id = $(this).attr("data-id");

    // 向服务器发送删除请求
    $.ajax({
        type: "delete",
        url: "/categories/" + id,
        success: function(response) {
            // 刷新页面
            location.reload();
        }
    });

})