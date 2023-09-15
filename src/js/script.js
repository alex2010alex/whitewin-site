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
    if (!header.classList.contains('header__dropdown--active')) {
      menuBackdrop.classList.toggle('backdrop--active');
    }
    menuBackdrop.addEventListener('click', () => {
      menuBackdrop.classList.remove('backdrop--active');
      setLangDropdown.classList.remove('switch-language__dropdown--active');
    })
  });

  setLangDropdownEls.forEach((el) => {
    el.addEventListener('click', () => {
      menuBackdrop.classList.remove('backdrop--active');
      setLangDropdown.classList.remove('switch-language__dropdown--active');

      let currentLang = setLangBtn.querySelector('p').innerHTML;
      
      setLangBtn.querySelector('p').innerHTML = el.innerHTML;
      el.innerHTML = currentLang;
    });
  });

  menuDropdownLink.addEventListener('click', (e) => {
    e.preventDefault();
    if (!setLangDropdown.classList.contains('switch-language__dropdown--active')) {
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
    if (header.classList.contains('mobile-menu--active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  });
  const mobileDropdownBtns = header.querySelectorAll('.mobile-menu__dropdown-btn');
  mobileDropdownBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('mobile-dropdown--active');
    });
  })

  const formTopicInput = document.querySelectorAll('.form__topic');
  const formTopicDropdown = document.querySelector('.topic__dropdown');
  if (formTopicInput) {
    formTopicInput.forEach((topicInput) => {
      topicInput.addEventListener('click', (e) => {
        if (e.target.classList.contains('topic__dropdown-item')) {
          topicInput.querySelector('.input-placeholder').innerHTML = e.target.innerHTML;
          topicInput.querySelector('#form-topic').setAttribute('value', e.target.innerHTML);
        }
        console.log(e.target)
        topicInput.classList.toggle('topic__dropdown--active');
      });
    })
    
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

  if (document.querySelector('#accordion')) {
    new ItcAccordion(document.querySelector('.accordion'), {
      alwaysOpen: true
    });
  }

  //content slider
  const swiperContainer = document.querySelector('.slider-container'); //swiper-slide-active
  if (swiperContainer) {
    const sliderSlide = swiperContainer.querySelectorAll('.swiper-slide');
    const imageDesc = swiperContainer.querySelector('.p');
    imageDesc.innerHTML = sliderSlide[0].getAttribute('alt');

    var contentSwiper = new Swiper(".contentSlider", {
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    contentSwiper.on('slideChange', () => {
      imageDesc.innerHTML = sliderSlide[contentSwiper.activeIndex].getAttribute('alt');
    });

    const sliderPrev = document.querySelector('.sliderPrev');
    const sliderNext = document.querySelector('.sliderNext');
    sliderPrev.addEventListener('click', () => {
      contentSwiper.slidePrev();
    });
    sliderNext.addEventListener('click', () => {
      contentSwiper.slideNext();
    });
  };

  // numbers counter ++
  let numbersTitle = document.querySelectorAll('.numbers__title');

  const observerOptions = {
    rootMargin: '0px 0px -10% 0px',
    threshold: 0,
  }

  if (numbersTitle.length != 0) {
    numbersTitle.forEach((title) => {
      title.setAttribute('data-end-counter', title.innerHTML);
      title.innerHTML = 0;
    });

    const numbersCounterCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          numbersTitle.forEach((title) => {
            numberCounter(title);
          });
        }
      });
    }

    const numberObserver = new IntersectionObserver(numbersCounterCallback, observerOptions);

    numberObserver.observe(numbersTitle[0]);
  }

  function numberCounter(title) {
    let number = title.getAttribute('data-end-counter').replace(/[^0-9]/g, "");
    let symbol = title.getAttribute('data-end-counter').replace(/[0-9]/g, "");

    let n = 0;
    let step = number < 100 ? 1 : 10;

    let t = step === 1 ? 50 : 10;

    let interval = setInterval(() => {
      n += step;
      title.innerHTML = n + symbol;
      if (n == number) {
        clearInterval(interval);
      }
    }, t)

    title.removeAttribute('data-end-counter');
  }

  //partners
  const partnersList = document.querySelector('.partners__list');

  if (partnersList) {
    const partnersListCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          loadPartners(partnersList);
        }
      });
    }

    const partnersListObserver = new IntersectionObserver(partnersListCallback, observerOptions);

    partnersListObserver.observe(partnersList);

    function loadPartners(partnersList) {
      const allPartners = partnersList.querySelectorAll('.partners__list-element');
      allPartners.forEach((el, idx) => {
        setTimeout(() => {el.classList.add('load');}, idx * (allPartners.length + 80) + 250)
      });
    };
  }

  const modal = document.querySelector('.popUp-modal');
  const popUpBack = document.querySelector('.popUp-background');
  const openModalBtn = document.querySelector('.quick-consult');
  const closeModalBtn = modal.querySelector('.close-modal');

  openModalBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('modal--show');
    popUpBack.classList.remove('modal--close');
    document.body.style.overflow = 'hidden';
    popUpBack.classList.add('modal--open');
    
    popUpBack.addEventListener('click', () => {
      modal.classList.remove('modal--show');
      popUpBack.classList.remove('modal--open');
      popUpBack.classList.add('modal--close');
      document.body.style.overflow = 'visible';
    });
  });
  closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('modal--show');
    popUpBack.classList.remove('modal--open');
    popUpBack.classList.add('modal--close');
    document.body.style.overflow = 'visible';
  });

  const reviewsList = document.querySelectorAll('.review__info');

  if (reviewsList.length > 0){
    reviewsList.forEach((review) => {
      const btn = review.querySelector('.review__view-full-btn');
      let reviewHeight = review.querySelector('.review__text').scrollHeight;
      let reviewText = review.querySelector('.review__text');
      if (reviewHeight <= 140){
        btn.style.opacity = 0;
      }

      btn.addEventListener('click', (e) => {
        let reviewHeight = review.querySelector('.review__text').scrollHeight;
        e.preventDefault();
        if(reviewText.classList.contains('open')){
          reviewText.classList.remove('open');
          reviewText.style.height = 140 + 'px';
        }else{
          reviewText.classList.add('open');
          reviewText.style.height = `${reviewHeight}px`;
        }

      })
    });
  }
});

