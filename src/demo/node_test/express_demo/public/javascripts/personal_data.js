// public/javascripts/personal_data.js
document.addEventListener('DOMContentLoaded', function () {
    const gameItems = document.querySelectorAll('.game-item');
    const editProfileBtn = document.querySelector('.edit-profile-btn');

    gameItems.forEach(item => {
        item.addEventListener('click', function () {
            const gameUrl = this.getAttribute('data-game-url');
            if (gameUrl) {
                window.open(gameUrl, '_blank');
            } else {
                console.error('Game URL is not defined:', gameUrl);
            }
        });
    });

    // 添加事件监听器到“修改个人资料”按钮
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function () {
            window.location.href = '/update_data';
        });
    }
});