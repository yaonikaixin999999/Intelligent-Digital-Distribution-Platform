// public/javascripts/wallet.js
$(document).ready(function () {
    // 获取用户余额并更新页面显示
    function fetchBalance() {
        $.ajax({
            url: '/wallet/balance', // 修改为正确的路径
            method: 'GET',
            success: function (response) {
                $('#balance').text('当前钱包余额 NT$' + response.balance);
            },
            error: function (xhr, status, error) {
                console.error('AJAX Error: ' + status + error);
                alert('获取余额失败，请重试。');
            }
        });
    }

    // 页面加载时获取余额
    fetchBalance();

    // 充值按钮点击事件
    $('.recharge-btn').click(function () {
        var amount = $(this).data('amount');

        // 验证金额是否为有效数字
        if (isNaN(amount)) {
            alert('无效的金额');
            return;
        }

        $.ajax({
            url: '/wallet/recharge', // 修改为正确的路径
            method: 'POST',
            data: { amount: parseFloat(amount) }, // 确保发送的是浮点数
            success: function (response) {
                $('#balance').text('当前钱包余额 NT$' + response.newBalance);
                alert('充值成功！');
            },
            error: function (xhr, status, error) {
                console.error('AJAX Error: ' + status + error);
                alert('充值失败，请重试。');
            }
        });
    });
});