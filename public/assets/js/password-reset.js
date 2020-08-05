// 当表单发生提交行为时
$("#modifyForm").on("submit", function() {
    // 获取用户输入内容
    let formData = $(this).serialize();
    console.log(formData);
    $.ajax({
        type: "put",
        url: "/users/password",
        data: formData,
        success: function() {
            location.href = "/admin/login.html";
        }
    });

    // 阻止表单默认提交
    return false;
})