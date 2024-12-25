document.addEventListener('DOMContentLoaded', function () {
    const infoItems = document.querySelectorAll('.info-item');
    const modal = document.getElementById('myModal');
    const closeBtn = document.querySelector('.close');
    const editForm = document.getElementById('editForm');
    const modalTitle = document.getElementById('modalTitle');
    const valueInput = document.getElementById('value');

    let currentField = null;

    // 显示模态对话框
    function showModal(field, value, label) {
        modalTitle.textContent = `修改${label}`;
        valueInput.value = value;
        currentField = field;
        modal.style.display = 'block';
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

        // 这里可以添加保存到服务器的逻辑
        console.log(`Updated ${currentField} to ${newValue}`);
    });
});

//未实现的功能封阻
document.addEventListener('DOMContentLoaded', function () {
    // 获取所有的未实现功能
    const socialIcons = document.querySelectorAll('.info-item-UN');

    // 为每个未实现功能添加点击事件监听器
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function (event) {
            event.preventDefault(); // 阻止默认行为
            alert('暂不支持该功能哦');
        });
    });
});