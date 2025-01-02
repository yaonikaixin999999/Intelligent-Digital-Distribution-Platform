document.addEventListener('DOMContentLoaded', function () {
    const infoItems = document.querySelectorAll('.info-item');
    const modal = document.getElementById('myModal');
    const closeBtn = document.querySelector('.close');
    const editForm = document.getElementById('editForm');
    const modalTitle = document.getElementById('modalTitle');
    const valueInput = document.getElementById('value');
    const submitGameButton = document.getElementById('submitGame');

    let currentField = null;
    let currentValue = null;

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
            const value = item.querySelector('.info-value').textContent.trim().split(' ')[0]; // 获取值并去除箭头
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
            item.querySelector('.info-value').textContent = newValue;
        });

        // 关闭模态对话框
        hideModal();
    });

    // 处理上架游戏按钮点击事件
    submitGameButton.addEventListener('click', function (event) {
        event.preventDefault();

        // 获取所有游戏信息
        const gameData = {
            game_id: document.getElementById('game_id').textContent.trim().split(' ')[0],
            game_name: document.getElementById('game_name').textContent.trim().split(' ')[0],
            game_image: document.getElementById('game_image').textContent.trim().split(' ')[0],
            game_label: document.getElementById('game_label').textContent.trim().split(' ')[0],
            last_price: parseFloat(document.getElementById('last_price').textContent.trim().split(' ')[0]),
            discount: parseFloat(document.getElementById('discount').textContent.trim().split(' ')[0]),
            game_url: document.getElementById('game_url').textContent.trim().split(' ')[0],
            brief: document.getElementById('brief').textContent.trim()
        };

        // 计算折扣价
        gameData.now_price = gameData.last_price * (1 - gameData.discount / 100);

        // 发送请求到服务器保存数据
        fetch('/game_shelf_s/save_game_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gameData)
        })
            .then(response => response.text())
            .then(message => {
                alert(message); // 弹窗提示
                location.reload(); // 刷新页面
            })
            .catch(error => {
                console.error('保存游戏数据失败', error);
                alert('保存游戏数据失败'); // 弹窗提示
            });
    });
});