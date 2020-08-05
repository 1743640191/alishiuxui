// 当表单发生提交事件时
$("#userForm").on('submit', function() {
    // 获取表单信息
    let formData = $(this).serialize();

    // 向服务器发送修改强求
    $.ajax({
        url: '/users',
        type: 'post',
        data: formData,
        success: function() {
            // 刷新页面
            location.reload();
        },
        error: function() {
            alert('添加用户失败');
        }
    })

    // 阻止表单默认提交行为
    return false;
});

// 当用户选择文件时触发
$("#modifyBox").on('change', '#avatar', function() {
    // 用户选择到的文件
    // thia.files[0]
    let formData = new FormData();
    formData.append('avatar', this.files[0]);

    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 不解析请求参数
        processData: false,
        // 不设置头信息
        contentType: false,
        success: function(response) {
            // 实现头像预览功能
            $("#preview").attr('src', response[0].avatar);
            // 实现数据库保存
            $("#hiddenAvatar").val(response[0].avatar);
        }
    });
});

// 向服务器请求用户数据
$.ajax({
    type: 'get',
    url: '/users',
    success: function(response) {
        // console.log(response);
        // 将用户列表拼接好渲染到页面上
        let html = template('userTpl', { data: response });
        $("#userBox").html(html);
    }
});

// 通过事件委托为编辑按钮添加点击事件
$("#userBox").on('click', '.edit', function() {
    // 获取当前用户id
    let id = $(this).attr("data-id");

    // 根据id向服务器查询用户信息
    $.ajax({
        url: '/users/' + id,
        type: 'get',
        success: function(response) {
            // 将要修改的信息渲染到页面
            let html = template('modifyTpl', response);
            $("#modifyBox").html(html);
        }
    });
});

// 为提交修改用户表单添加提交事件
$("#modifyBox").on('submit', '#modifyForm', function() {
    // 获取用户修改的值
    let formData = $(this).serialize();

    // 根据当前id向服务器发送修改请求
    $.ajax({
        url: '/users/' + $(this).attr('data-id'), //当前用户id
        type: 'put',
        data: formData,
        success: function(response) {
            // 刷新页面
            location.reload();
        }
    });

    // 阻止表单默认提交行为
    return false;
});

// 委托绑定点击删除事件
$("#userBox").on('click', '.delete', function() {
    if (!confirm('您确定要删除吗?')) {
        return;
    };

    // 向服务器发送请求删除当前点击用户
    $.ajax({
        url: '/users/' + $(this).attr('data-id'),
        type: 'delete',
        success: function(response) {
            // 刷新页面
            location.reload();
        }
    });

});

// 获取全选按钮
let selectAll = $("#selectAll");
// 获取批量删除按钮
let deleteMany = $("#deleteMany");

// 实现用户复选框全选
selectAll.on('change', function() {
    // 获取全选按钮当前状态
    let status = $(this).prop("checked")

    if (status) {
        // 显示全选按钮
        deleteMany.fadeIn();
    } else {
        // 隐藏全选按钮
        deleteMany.fadeOut();
    }

    // 实现全选
    $("#userBox").find('input').prop("checked", status);
});

// 实现用户复选框全选
$("#userBox").on('change', '.userStatus', function() {
    // 获取全部用户
    let inputs = $("#userBox").find('input');

    // 所有用户与过滤出选中状态的用户对比
    if (inputs.length == inputs.filter(":checked").length) {
        // 设置全选按钮当前状态
        selectAll.prop("checked", true)
    } else {
        // 设置全选按钮当前状态
        selectAll.prop("checked", false)
    };

    if (inputs.filter(":checked").length > 0) {
        // 显示全选按钮
        deleteMany.fadeIn();
    } else {
        // 隐藏全选按钮
        deleteMany.fadeOut();
    };
});

// 批量删除用户
deleteMany.on('click', function() {
    // 存储选中用户id
    let ids = [];

    // 过滤出选中用户
    let checkedUser = $("#userBox").find('input').filter(":checked");
    // 选中用户id追加到isd
    checkedUser.each(function(index, ele) {
        ids.push($(ele).attr("data-id"));
    });

    if (!confirm('您确定要删除吗?')) {
        return;
    };

    // 向服务器发送批量删除请求
    $.ajax({
        type: "delete",
        url: "/users/" + ids.join('-'),
        success: function(response) {
            // 刷新页面
            location.reload();
        }
    });
});