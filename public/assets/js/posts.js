// 向服务器发送请求获取文章列表数据
$.ajax({
    type: "get",
    url: "/posts",
    success: function(response) {
        let html = template('postsTpl', { data: response });
        $("#postsBox").html(html);
        let page = template('pageTpl', response);
        $("#page").html(page);
    }
});


// 分页
function changePage(page) {
    // 向服务器发送请求获取文章列表数据
    $.ajax({
        type: "get",
        url: "/posts",
        data: { page },
        success: function(response) {
            let html = template('postsTpl', { data: response });
            $("#postsBox").html(html);
            let page = template('pageTpl', response);
            $("#page").html(page);
        }
    });
}

// 向服务器请求分类数据
$.ajax({
    type: "get",
    url: "/categories",
    success: function(response) {
        let html = template('categoryTpl', { data: response })
        $("#categoryBox").html(html);
    }
});

// 当点击筛选按钮时
$("#filterForm").on('submit', function() {

    // 获取管理员筛选条件
    let formData = $(this).serialize();

    // 向服务器发送筛选请求
    $.ajax({
        type: "get",
        url: "/posts",
        data: formData,
        success: function(response) {
            let html = template('postsTpl', { data: response });
            $("#postsBox").html(html);
            let page = template('pageTpl', response);
            $("#page").html(page);
        }
    });
    // 阻止表单默认提交
    return false;
});

// 当点击删除的时候
$("#postsBox").on('click', '.delete', function() {
    if (!confirm('您确定要删除吗？')) return;
    // 获取当前id
    let id = $(this).attr('data-id');
    // 向服务器发送删除请求根据id
    $.ajax({
        type: "delete",
        url: "/posts/" + id,
        success: function(response) {
            // 刷新页面
            location.reload();
        }
    });
});