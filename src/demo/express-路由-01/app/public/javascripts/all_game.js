function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('zh-CN', options);
}

function showPurchaseAlert() {
    alert('您已经拥有这个游戏了');
}

function buyGame(gameId) {
    alert('购买游戏 ID: ' + gameId);
}