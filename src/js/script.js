document.addEventListener('DOMContentLoaded', () => {
    const setLangBtn = document.querySelector('.switch-language__btn');
    const setLangDropdown = document.querySelector('.switch-language__dropdown');
    const setLangDropdownEls = document.querySelectorAll('.switch-language__dropdown-element');

    const menuBackdrop = document.querySelector('.backdrop');

    const menuDropdownLink = document.querySelector('.menu-item__dropdown');
    const header = document.querySelector('.header');

    setLangBtn.addEventListener('click', (e) => {
        e.preventDefault();
        setLangDropdown.classList.toggle('switch-language__dropdown--active');
        if (!header.classList.contains('header__dropdown--active')){
            menuBackdrop.classList.toggle('backdrop--active');
        }
        menuBackdrop.addEventListener('click', () => {
            menuBackdrop.classList.remove('backdrop--active');
            setLangDropdown.classList.remove('switch-language__dropdown--active');
        })
    });

    menuDropdownLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (!setLangDropdown.classList.contains('switch-language__dropdown--active')){
            menuBackdrop.classList.toggle('backdrop--active');
        }
        header.classList.toggle('header__dropdown--active');
        menuBackdrop.addEventListener('click', () => {
            menuBackdrop.classList.remove('backdrop--active');
            header.classList.remove('header__dropdown--active');
        })
    });

    //mobile menu
    const burgerBtn = header.querySelector('.burger-btn');
    burgerBtn.addEventListener('click', () => {
        header.classList.toggle('mobile-menu--active');
        if (header.classList.contains('mobile-menu--active')){
            document.body.style.overflow = 'hidden';
        }else{
            document.body.style.overflow = 'visible';
        }
    });
    const mobileDropdownBtns = header.querySelectorAll('.mobile-menu__dropdown-btn');
    mobileDropdownBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('mobile-dropdown--active');
        });
    })

    const formTopicInput = document.querySelector('.form__topic');
    const formTopicDropdown = document.querySelector('.topic__dropdown');
    formTopicInput.addEventListener('click', (e) => {
        if (e.target.classList.contains('topic__dropdown-item')){
            formTopicInput.querySelector('.input-placeholder').innerHTML = e.target.innerHTML;
            formTopicInput.querySelector('#form-topic').setAttribute('value', e.target.innerHTML);
        }
        console.log(e.target)
        formTopicInput.classList.toggle('topic__dropdown--active');
    });
});