// public/javascripts/shopping_cart.js
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');

    // 移除输入事件监听器
    // searchInput.addEventListener('input', () => {
    //     const query = searchInput.value.trim();
    //     fetchSearchResults(query);
    // });

    // 添加按钮点击事件监听器
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        fetchSearchResults(query);
    });

    function fetchSearchResults(query) {
        fetch(`/shopping_cart/search?query=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                renderWishList(data.wishList, data.purchasedGames);
            })
            .catch(error => console.error('Error:', error));
    }

    function renderWishList(wishList, purchasedGames) {
        const container = document.querySelector('.container');
        const wishListContainer = document.createElement('div');
        wishListContainer.className = 'wishlist-container';

        if (wishList.length === 0) {
            wishListContainer.innerHTML = '<p>未查找到该游戏</p>';
        } else {
            wishList.forEach(game => {
                const item = document.createElement('div');
                item.className = 'wishlist-item';
                item.onclick = () => window.open(game.game_url, '_blank');

                item.innerHTML = `
                    <img src="${game.game_image}" alt="游戏封面">
                    <div class="wishlist-item-content">
                        <h2>${game.game_name}</h2>
                        <p>添加日期: ${formatDate(game.add_time)}</p>
                    </div>
                    <div class="wishlist-item-actions">
                        ${purchasedGames.includes(game.game_id) ? `
                            <button class="discount purchased" onclick="showPurchaseAlert(); event.stopPropagation()">
                                已购买
                            </button>
                        ` : `
                            <button class="discount" onclick="buyGame('${game.game_id}'); event.stopPropagation()">
                                ${game.discount === '免费' ? '免费' : `${game.discount} NT$ ${game.now_price}`}
                            </button>
                        `}
                    </div>
                `;

                wishListContainer.appendChild(item);
            });
        }

        // 清空现有的愿望单内容
        const existingWishList = container.querySelector('.wishlist-container');
        if (existingWishList) {
            container.removeChild(existingWishList);
        }

        // 找到 .search-bar 的父元素
        const searchBarContainer = container.querySelector('.search-bar').parentNode;
        searchBarContainer.appendChild(wishListContainer);
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('zh-CN', options);
    }

    function showPurchaseAlert() {
        alert('您已经拥有这个游戏了');
    }

    function buyGame(gameId) {
        const userId = '1001'; // 假设用户ID已知
        fetch('/shopping_cart/buy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, gameId })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('购买成功');
                    // 刷新当前页面
                    location.reload();
                } else {
                    alert(data.message);
                }
            })
            .catch(error => console.error('Error:', error));
    }
});

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('zh-CN', options);
}

function showPurchaseAlert() {
    alert('您已经拥有这个游戏了');
}