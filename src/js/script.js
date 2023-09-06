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
    if (formTopicInput){
        formTopicInput.addEventListener('click', (e) => {
            if (e.target.classList.contains('topic__dropdown-item')){
                formTopicInput.querySelector('.input-placeholder').innerHTML = e.target.innerHTML;
                formTopicInput.querySelector('#form-topic').setAttribute('value', e.target.innerHTML);
            }
            console.log(e.target)
            formTopicInput.classList.toggle('topic__dropdown--active');
        });
    }

    // templates accordion
    // const accordionHeaders = document.querySelectorAll('.templates__list-element-header');
    // if (accordionHeaders){
    //     accordionHeaders.forEach((header) => {
    //         header.addEventListener('click', () => {
    //             header.classList.toggle('templates__list-element--active');
    //         });
    //     });
    // }


    class ItcAccordion {
        constructor(target, config) {
          this._el = typeof target === 'string' ? document.querySelector(target) : target;
          const defaultConfig = {
            alwaysOpen: true,
            duration: 350
          };
          this._config = Object.assign(defaultConfig, config);
          this.addEventListener();
        }
        addEventListener() {
          this._el.addEventListener('click', (e) => {
            const elHeader = e.target.closest('.accordion__header');
            if (!elHeader) {
              return;
            }
            if (!this._config.alwaysOpen) {
              const elOpenItem = this._el.querySelector('.accordion__item_show');
              if (elOpenItem) {
                elOpenItem !== elHeader.parentElement ? this.toggle(elOpenItem) : null;
              }
            }
            this.toggle(elHeader.parentElement);
          });
        }
        show(el) {
          const elBody = el.querySelector('.accordion__body');
          if (elBody.classList.contains('collapsing') || el.classList.contains('accordion__item_show')) {
            return;
          }
          elBody.style['display'] = 'block';
          const height = elBody.offsetHeight;
          elBody.style['height'] = 0;
          elBody.style['overflow'] = 'hidden';
          elBody.style['transition'] = `height ${this._config.duration}ms ease`;
          elBody.classList.add('collapsing');
          el.classList.add('accordion__item_slidedown');
          elBody.offsetHeight;
          elBody.style['height'] = `${height}px`;
          window.setTimeout(() => {
            elBody.classList.remove('collapsing');
            el.classList.remove('accordion__item_slidedown');
            elBody.classList.add('collapse');
            el.classList.add('accordion__item_show');
            elBody.style['display'] = '';
            elBody.style['height'] = '';
            elBody.style['transition'] = '';
            elBody.style['overflow'] = '';
          }, this._config.duration);
        }
        hide(el) {
          const elBody = el.querySelector('.accordion__body');
          if (elBody.classList.contains('collapsing') || !el.classList.contains('accordion__item_show')) {
            return;
          }
          elBody.style['height'] = `${elBody.offsetHeight}px`;
          elBody.offsetHeight;
          elBody.style['display'] = 'block';
          elBody.style['height'] = 0;
          elBody.style['overflow'] = 'hidden';
          elBody.style['transition'] = `height ${this._config.duration}ms ease`;
          elBody.classList.remove('collapse');
          el.classList.remove('accordion__item_show');
          elBody.classList.add('collapsing');
          window.setTimeout(() => {
            elBody.classList.remove('collapsing');
            elBody.classList.add('collapse');
            elBody.style['display'] = '';
            elBody.style['height'] = '';
            elBody.style['transition'] = '';
            elBody.style['overflow'] = '';
          }, this._config.duration);
        }
        toggle(el) {
          el.classList.contains('accordion__item_show') ? this.hide(el) : this.show(el);
        }
      }

      new ItcAccordion(document.querySelector('.accordion'), {
        alwaysOpen: true
      });
});

