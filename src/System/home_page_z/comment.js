function toggleContent() {
    const content = document.querySelector('.content');
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = '100px';
    }
}

function vote(type) {
    const votes = document.querySelector('.votes');
    switch (type) {
        case 'yes':
            votes.innerHTML += '<p>有人觉得这篇评测有价值</p>';
            break;
        case 'no':
            votes.innerHTML += '<p>有人觉得这篇评测无价值</p>';
            break;
        case 'funny':
            votes.innerHTML += '<p>有人觉得这篇评测很欢乐</p>';
            break;
        case 'reward':
            votes.innerHTML += '<p>有人给这篇评测奖励</p>';
            break;
        default:
            break;
    }
}