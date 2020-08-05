// 向服务器发送请求获取文章列表数据
$.ajax({
    type: "get",
    url: "/posts",
    success: function(response) {
        let html = template('postsTpl', { data: response });
        $("#postsBox").html(html);
    }
});