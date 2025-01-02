// update.js
document.addEventListener('DOMContentLoaded', function () {
    const infoItems = document.querySelectorAll('.info-item');
    const modal = document.getElementById('myModal');
    const closeBtn = document.querySelector('.close');
    const editForm = document.getElementById('editForm');
    const modalTitle = document.getElementById('modalTitle');
    const valueInput = document.getElementById('value');
    const lddpIdElement = document.querySelector('.info-item-not span.info-value'); // 获取 LDDP ID 元素
    const accountStatusElement = document.querySelector('.info-item-not span.info-value[data-field="flag"]'); // 获取账号状态元素
    const backButton = document.querySelector('.back'); // 获取返回按钮

    let currentField = null;
    let currentValue = null;
    let userId = null; // 用于存储用户ID

    // 显示模态对话框
    function showModal(field, value, label) {
        modalTitle.textContent = `修改${label}`;
        valueInput.value = value; // 设置文本框的初始值
        currentField = field;
        currentValue = value;
        modal.style.display = 'block';

        // 移除现有的 focus 事件监听器
        valueInput.removeEventListener('focus', clearInput);
        // 添加新的 focus 事件监听器
        valueInput.addEventListener('focus', clearInput);
    }

    // 清空输入框内容
    function clearInput() {
        if (valueInput.value === currentValue) {
            valueInput.value = '';
        }
    }

    // 隐藏模态对话框
    function hideModal() {
        modal.style.display = 'none';
    }

    // 处理点击事件
    infoItems.forEach(item => {
        item.addEventListener('click', function () {
            const field = item.getAttribute('data-field');
            const value = item.getAttribute('data-value');
            const label = item.querySelector('.info-label').textContent;
            showModal(field, value, label);
        });
    });

    // 处理关闭按钮点击事件
    closeBtn.addEventListener('click', hideModal);

    // 处理点击模态对话框外部关闭
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            hideModal();
        }
    });

    // 处理表单提交
    editForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const newValue = valueInput.value;

        // 更新页面上的值
        const infoItemsToUpdate = document.querySelectorAll(`.info-item[data-field="${currentField}"]`);
        infoItemsToUpdate.forEach(item => {
            item.querySelector('.info-value').textContent = newValue + ' ›';
            item.setAttribute('data-value', newValue);
        });

        // 关闭模态对话框
        hideModal();

        // 发送请求到服务器保存数据
        const data = {
            user_id: userId
        };

        // 根据 currentField 设置正确的字段名称
        if (currentField === 'nickname') {
            data.cust_name = newValue;
        } else if (currentField === 'gender') {
            data.sex = newValue;
        } else if (currentField === 'email') {
            data.email = newValue;
        } else if (currentField === 'phone') {
            data.phone_number = newValue;
        }

        fetch('/update_data/save_user_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.text())
            .then(message => console.log(message))
            .catch(error => console.error('保存用户数据失败', error));
    });

    // 未实现的功能封阻
    const socialIcons = document.querySelectorAll('.info-item-UN');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function (event) {
            event.preventDefault(); // 阻止默认行为
            alert('暂不支持该功能哦');
        });
    });

    // 获取用户数据并填充到页面
    function fetchUserData(userId) {
        fetch(`/update_data/get_user_data?user_id=${userId}`)
            .then(response => response.json())
            .then(data => {
                document.querySelector('.info-item[data-field="nickname"]').querySelector('.info-value').textContent = data.cust_name + ' ›';
                document.querySelector('.info-item[data-field="gender"]').querySelector('.info-value').textContent = data.sex + ' ›';
                document.querySelector('.info-item[data-field="email"]').querySelector('.info-value').textContent = data.email + ' ›';
                document.querySelector('.info-item[data-field="phone"]').querySelector('.info-value').textContent = data.phone_number + ' ›';
                lddpIdElement.textContent = data.user_id; // 设置 LDDP ID
                accountStatusElement.textContent = data.flag === 1 ? '账号正常' : '该用户已被封禁'; // 设置账号状态
            })
            .catch(error => console.error('获取用户数据失败', error));
    }

    // 假设用户id是已知的，调用 fetchUserData 函数来获取用户数据
    userId = '1001'; // 假设用户id是已知的
    fetchUserData(userId);

    // 添加返回按钮的点击事件监听器
    if (backButton) {
        backButton.addEventListener('click', function (event) {
            event.preventDefault(); // 阻止默认行为
            window.history.back(); // 返回上一个页面
        });
    }
});