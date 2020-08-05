// 为退出按钮添加点击事件
$("#loginout").on('click', function() {
    if (confirm('确定要退出吗？')) {
        // 向服务器发送退出请求
        $.ajax({
            url: '/logout',
            type: 'post',
            success: function(response) {
                // 退出成功跳回登录页面
                location.href = 'login.html';
            },
            error: function() {
                alert('退出失败');
            }
        })
    }
});