const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

document.addEventListener('DOMContentLoaded', function () {
  // 获取所有的社交图标
  const socialIcons = document.querySelectorAll('.social-icon');

  // 为每个图标添加点击事件监听器
  socialIcons.forEach(icon => {
    icon.addEventListener('click', function (event) {
      event.preventDefault(); // 阻止默认行为
      alert('暂不支持该功能哦');
    });
  });
});