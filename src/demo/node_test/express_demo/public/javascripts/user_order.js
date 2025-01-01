document.addEventListener('DOMContentLoaded', function () {
    // 获取所有退款按钮
    const refundButtons = document.querySelectorAll('.refund-button');
    // 获取弹窗元素
    const modal = document.getElementById('refundModal');
    // 获取关闭按钮
    const closeButton = document.querySelector('.close-button');

    // 点击退款按钮时显示弹窗
    refundButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            modal.style.display = 'block';
        });
    });

    // 点击关闭按钮时隐藏弹窗
    closeButton.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // 点击弹窗外区域时隐藏弹窗
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

function getStatusText(flag) {
    switch (flag) {
        case '0': return '退款中';
        case '-1': return '退款失败';
        case '1': return '退款成功';
        default: return '购买成功';
    }
}

function getStatusClass(flag) {
    switch (flag) {
        case '0': return 'status-yellow';
        case '-1': return 'status-red';
        case '1': return 'status-green';
        default: return 'status-blue';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const refundButtons = document.querySelectorAll('.refund-button');
    const cancelButton = document.querySelectorAll('.cancel-refund-button');
    const modal = document.getElementById('refundModal');
    const closeButton = document.querySelector('.close-button');
    const refundForm = document.getElementById('refundForm');

    refundButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const orderId = this.getAttribute('data-order-id');
            document.getElementById('orderId').value = orderId;
            modal.style.display = 'block';
        });
    });

    cancelButton.forEach(button => {
        button.addEventListener('click', async function (event) {
            event.preventDefault();
            const orderId = this.getAttribute('data-order-id');
            try {
                const response = await fetch(`/user_order/cancel/${orderId}`, { method: 'POST' });
                if (response.ok) {
                    location.reload();
                } else {
                    alert('取消退款失败');
                }
            } catch (error) {
                console.error(error);
                alert('取消退款失败');
            }
        });
    });

    closeButton.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    refundForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        try {
            const response = await fetch('/user_order/refund', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                location.reload();
            } else {
                alert('退款提交失败');
            }
        } catch (error) {
            console.error(error);
            alert('退款提交失败');
        }
    });
});
