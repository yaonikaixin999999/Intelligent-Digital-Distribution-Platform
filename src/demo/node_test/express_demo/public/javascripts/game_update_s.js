console.log('game_update_s.js loaded');

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');

    const modal = document.getElementById('myModal');
    const closeBtn = document.querySelector('.close');
    const editForm = document.getElementById('editForm');
    const valueInput = document.getElementById('value');
    let currentField = '';
    let currentGameId = '';

    // 获取游戏 ID
    const gameIdElement = document.querySelector('.info-item-not .info-value');
    if (gameIdElement) {
        currentGameId = gameIdElement.textContent.trim();
    }

    // 打开模态框
    document.querySelectorAll('.info-item').forEach(item => {
        item.addEventListener('click', function () {
            currentField = this.getAttribute('data-field');
            const currentValue = this.getAttribute('data-value');
            valueInput.value = currentValue;
            modal.style.display = 'block';
        });
    });

    // 关闭模态框
    closeBtn.onclick = function () {
        modal.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    // 提交表单
    editForm.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log('Form submitted');

        const newValue = valueInput.value.trim();
        const query = 'UPDATE game SET ?? = ? WHERE game_id = ?';
        const values = [currentField, newValue, currentGameId];

        if (currentField === 'discount' || currentField === 'last_price') {
            // 获取原价和折扣
            const lastPriceElement = document.querySelector('.info-item[data-field="last_price"]').getAttribute('data-value');
            const discountElement = document.querySelector('.info-item[data-field="discount"]').getAttribute('data-value');
            const lastPrice = parseFloat(lastPriceElement);
            const discount = parseFloat(discountElement);

            // 计算现价
            const nowPrice = lastPrice * (1 - discount / 100);
            console.log('Calculating now_price:', nowPrice);

            // 更新 now_price
            values.push(nowPrice);

            // 发送请求到服务器更新 now_price
            fetch(`/game_update_s/update_now_price/${currentGameId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nowPrice })
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Now price updated:', data);
                })
                .catch(error => {
                    console.error('Error updating now price:', error);
                });
        }

        // 发送请求到服务器更新数据
        fetch(`/game_update_s/update_game/${currentGameId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ field: currentField, value: newValue })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Data updated:', data);
                // 刷新页面
                location.reload();
            })
            .catch(error => {
                console.error('Error updating data:', error);
            });
    });
});