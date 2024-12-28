// 获取登录表单
const signInForm = document.querySelector('.sign-in-form');

// 获取登录表单中的账号和密码输入框
const user_idInput = document.querySelector('.sign-in-form input[type="text"]');
const passwordInput = document.querySelector('.sign-in-form input[type="password"]');

// 为登录表单添加提交事件监听器
signInForm.addEventListener('submit', function(event) {
    // 阻止表单地默认提交行为
    event.preventDefault();

    // 获取输入框中的值
    const user_id = user_idInput.value.trim();
    const password = passwordInput.value.trim();

    // 进行简单的验证（可以根据需要进行更复杂的验证）
    if (user_id === '' || password === '') {
        alert('账号和密码不能为空');
        return;
    }

    // 通过fetch发送数据到服务器
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id, password })
    })
        .then(response => {
            // 检查响应状态码
            if (!response.ok) {
                throw new Error('网络响应错误: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert('登录成功');
                // 重定向到其他页面或执行其他操作
                window.location.href = '/dashboard';
            } else {
                alert('登录失败: ' + data.message);
            }
        })
        .catch(error => {
            console.error('登录请求出错:', error);
            alert('登录请求出错，请稍后再试');
        });
});