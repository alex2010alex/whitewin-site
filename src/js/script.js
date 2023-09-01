document.addEventListener('DOMContentLoaded', () => {
    const setLangBtn = document.querySelector('.switch-language__btn');
    const setLangDropdown = document.querySelector('.switch-language__dropdown');
    const setLangDropdownEls = document.querySelectorAll('.switch-language__dropdown-element');

    setLangBtn.addEventListener('click', () => {
        setLangDropdown.classList.toggle('switch-language__dropdown--active');
    });



    const menuDropdownLink = document.querySelector('.menu-item__dropdown');
    menuDropdownLink.addEventListener('click', () => {
        menuDropdownLink.classList.toggle('menu__dropdown--active');
    });
});