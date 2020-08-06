// 向服务器发送请求获取评论数据
$.ajax({
    type: "get",
    url: "/comments",
    success: function(response) {
        console.log(response);
        let html = template('commentsTpl', response);
        $("#commentsBox").html(html);
        let page = template('pageTpl', response);
        $("#pageBox").html(page);
    }
});

// 实现分页
function changePage(page) {
    $.ajax({
        type: "get",
        url: "/comments",
        data: { page },
        success: function(response) {
            let html = template('commentsTpl', response);
            $("#commentsBox").html(html);
            let page = template('pageTpl', response);
            $("#pageBox").html(page);
        }
    });
}

// 当审核按钮被点击的时候
$("#commentsBox").on('click', '.status', function() {
    // 获取当前评论状态
    let status = $(this).attr("data-status");
    // 当前评论id
    let id = $(this).attr("data-id");

    // 向服务器发送修改请求
    $.ajax({
        type: "put",
        url: "/comments/" + id,
        data: { state: status == 1 ? 0 : 1 },
        success: function() {
            location.reload();
        }
    });
});

// 当删除按钮被点击时
$("#commentsBox").on('click', '.delete', function() {

    if (!confirm("您确定要删除吗？")) return;

    // 当前评论id
    let id = $(this).attr("data-id");
    $.ajax({
        type: "delete",
        url: "/comments/" + id,
        success: function(response) {
            location.reload();
        }
    });
});