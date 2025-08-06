const API_BASE_URL = 'https://nodebackend-3-9veh.onrender.com';

const charactersData = [
  { name: "Человек-Паук", desc: "Любимый супергерой детей", image: "images/человек паук новый.PNG", price: 5000, video: "videos/spiderman.mp4" },
  { name: "Железный Человек", desc: "Гений, миллиардер, плейбой, филантроп", image: "images/железный человек.PNG", price: 6000, video: "videos/ironman.mp4" },
  { name: "Бэтгерл", desc: "Отважная героиня Готэма", image: "images/batgerl.PNG", price: 5500, video: "videos/batgirl.mp4" },
  { name: "Пьеро", desc: "Грустный персонаж итальянской комедии", image: "images/IMG_1662.PNG", price: 4500, video: "videos/piero.mp4" },
  { name: "Эльза", desc: "Снежная королева из Холодного сердца", image: "images/эльза.PNG", price: 6500, video: "videos/elsa.mp4" },
  { name: "Пират", desc: "Отважный морской разбойник", image: "images/пират.PNG", price: 5000, video: "videos/pirate.mp4" },
  { name: "Гарри Поттер", desc: "Юный волшебник из Хогвартса", image: "images/гарри поттер.PNG", price: 6000, video: "videos/harrypotter.mp4" },
  { name: "Черепашки ниндзя", desc: "Четверка героев-мутантов", image: "images/черепашки ниндзя.PNG", price: 8000, video: "videos/tmnt.mp4" },
  { name: "Русалочка", desc: "Морская принцесса", image: "images/русалочка.PNG", price: 5500, video: "videos/mermaid.mp4" },
  { name: "Лего Ниндзяго", desc: "Ниндзя из мира Лего", image: "images/лего ниндзяго.PNG", price: 5500, video: "videos/ninjago.mp4" },
  { name: "Белоснежка", desc: "Самая добрая принцесса", image: "images/белоснежка.PNG", price: 5500, video: "videos/snowwhite.mp4" },
  { name: "Лунтик", desc: "Добрый пришелец с Луны", image: "images/лунтик.PNG", price: 5000, video: "videos/luntik.mp4" }
];

const showsData = [
  { name: "Химическое Шоу", desc: "Удивительные эксперименты с жидким азотом", image: "images/chemistry.jpeg", price: 10000, video: "videos/chemistry-show.mp4" },
  { name: "Бумажное Шоу", desc: "Музыка, танцы и море бумаги", image: "images/paper.jpeg", price: 12000, video: "videos/paper-show.mp4" },
  { name: "Шоу Пузырей", desc: "Волшебный мир огромных мыльных пузырей", image: "images/bubble.jpeg", price: 8000, video: "videos/bubble-show.mp4" },
  { name: "Шоу магии", desc: "Волшебное шоу для детей", image: "images/majic.jpeg", price: 8000, video: "videos/magic-show.mp4" }
];

const masterClassesData = [
  { name: "Создание костюмов", desc: "Научитесь создавать костюмы своими руками", price: 2500, icon: "✂️" },
  { name: "Актерское мастерство", desc: "Основы перевоплощения в персонажей", price: 3000, icon: "🎭" },
  { name: "Грим и макияж", desc: "Профессиональные техники грима", price: 2800, icon: "🎨" }
];

let currentPackage = null;
let selectedCharacters = [];
let selectedShows = [];
let selectedMasterClasses = [];
let maxCharacters = 0;
let maxShows = 0;
let maxMasterClasses = 0;
let basePrice = 0;

document.addEventListener('DOMContentLoaded', function() {
  initSliders();
  initPackageSelection();
  initMobileMenu();
  initSmoothScroll();
  initOrderButton();
  initFormValidation();
  initPhoneMask();
  initModalClose();
  initIntersectionObserver();
});

function initIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      document.querySelector('header').classList.add('scrolled');
    } else {
      document.querySelector('header').classList.remove('scrolled');
    }
  });
}

function initSliders() {
  const charactersSlider = document.getElementById('characters-slider');
  charactersSlider.innerHTML = '';
  
  charactersData.forEach(character => {
    const isSelected = selectedCharacters.some(c => c.name === character.name);
    const card = document.createElement('div');
    card.className = `character-card ${isSelected ? 'selected' : ''}`;
    card.dataset.name = character.name;
    
    card.innerHTML = `
      <img src="${character.image}" alt="${character.name}">
      <div class="character-info">
        <h4>${character.name}</h4>
        <p>${character.desc}</p>
        ${currentPackage === 'custom' ? `<p class="price-tag">${character.price}₽</p>` : ''}
        <button class="view-btn" data-video="${character.video}" data-name="${character.name}">Посмотреть</button>
      </div>
    `;
    
    charactersSlider.appendChild(card);
  });

  const showsSlider = document.getElementById('shows-slider');
  showsSlider.innerHTML = '';
  
  showsData.forEach(show => {
    const isSelected = selectedShows.some(s => s.name === show.name);
    const card = document.createElement('div');
    card.className = `show-card ${isSelected ? 'selected' : ''}`;
    card.dataset.name = show.name;
    
    card.innerHTML = `
      <img src="${show.image}" alt="${show.name}">
      <div class="show-info">
        <h4>${show.name}</h4>
        <p>${show.desc}</p>
        ${currentPackage === 'custom' ? `<p class="price-tag">${show.price}₽</p>` : ''}
        <button class="view-btn" data-video="${show.video}" data-name="${show.name}">Посмотреть</button>
      </div>
    `;
    
    showsSlider.appendChild(card);
  });

  const masterSlider = document.getElementById('master-slider');
  masterSlider.innerHTML = '';
  
  masterClassesData.forEach(master => {
    const isSelected = selectedMasterClasses.some(m => m.name === master.name);
    const card = document.createElement('div');
    card.className = `master-card ${isSelected ? 'selected' : ''}`;
    card.dataset.name = master.name;
    
    card.innerHTML = `
      <div class="master-icon">${master.icon}</div>
      <h4>${master.name}</h4>
      <p>${master.desc}</p>
      ${currentPackage === 'custom' ? `<p class="price-tag">${master.price}₽</p>` : ''}
    `;
    
    masterSlider.appendChild(card);
  });

  initSelectionHandlers();
  initGalleryButtons();
  initCarouselNavigation();
}

function initPackageSelection() {
  const packageButtons = document.querySelectorAll('.select-package');
  
  packageButtons.forEach(button => {
    button.addEventListener('click', function() {
      const packageCard = this.closest('.package-card');
      currentPackage = packageCard.dataset.package;
      
      switch(currentPackage) {
        case 'basic':
          maxCharacters = 1;
          maxShows = 0;
          maxMasterClasses = 1;
          basePrice = 10000;
          break;
        case 'standard':
          maxCharacters = 2;
          maxShows = 1;
          maxMasterClasses = 0;
          basePrice = 35000;
          break;
        case 'premium':
          maxCharacters = 3;
          maxShows = 2;
          maxMasterClasses = 1;
          basePrice = 55000;
          break;
        case 'custom':
          maxCharacters = 99;
          maxShows = 99;
          maxMasterClasses = 99;
          basePrice = 0;
          break;
      }
      
      selectedCharacters = [];
      selectedShows = [];
      selectedMasterClasses = [];
      
      document.getElementById('selected-package-name').textContent = getPackageName(currentPackage);
      document.getElementById('max-characters').textContent = maxCharacters;
      document.getElementById('max-shows').textContent = maxShows;
      document.getElementById('max-master').textContent = maxMasterClasses;
      
      document.getElementById('package-selection').classList.add('active');
      
      initSliders();
      updateSelection();
      
      setTimeout(() => {
        document.getElementById('package-selection').scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 300);
    });
  });
}

function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  mobileMenuBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    this.classList.toggle('active');
  });
  
  const navButtons = mobileMenu.querySelectorAll('.nav-button');
  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
    });
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

function initOrderButton() {
  const orderBtn = document.getElementById('order-btn');
  
  orderBtn.addEventListener('click', () => {
    updateFormSelectedServices();
    
    document.querySelector('#consultForm').scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  });
}

function initFormValidation() {
  const form = document.getElementById('consultationForm');
  
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = this.querySelector('#name');
    const phone = this.querySelector('#phone');
    const eventDate = this.querySelector('#eventDate');
    const childBirthday = this.querySelector('#childBirthday');
    
    let isValid = true;
    
    if (!name.value.trim()) {
      name.style.borderColor = 'red';
      isValid = false;
    } else {
      name.style.borderColor = '';
    }
    
    if (!phone.value.match(/^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/)) {
      phone.style.borderColor = 'red';
      isValid = false;
    } else {
      phone.style.borderColor = '';
    }
    
    if (!eventDate.value) {
      eventDate.style.borderColor = 'red';
      isValid = false;
    } else {
      eventDate.style.borderColor = '';
    }
    
    if (!childBirthday.value) {
      childBirthday.style.borderColor = 'red';
      isValid = false;
    } else {
      childBirthday.style.borderColor = '';
    }
    
    if (isValid && currentPackage) {
      try {
        const formData = {
          name: name.value,
          phone: phone.value,
          email: '',
          eventDate: eventDate.value,
          childBirthday: childBirthday.value,
          packageType: currentPackage,
          characters: selectedCharacters,
          shows: selectedShows,
          masterClasses: selectedMasterClasses,
          total: document.getElementById('total-price').textContent
        };

        const response = await fetch(`${API_BASE_URL}/bookings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Ошибка сервера');
        }

        const data = await response.json();
        showNotification('Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
        form.reset();
        resetSelection();
      } catch (error) {
        console.error('Ошибка:', error);
        showNotification(error.message || 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.', 'error');
      }
    } else if (!currentPackage) {
      showNotification('Пожалуйста, выберите пакет услуг', 'error');
    } else {
      showNotification('Пожалуйста, заполните все обязательные поля корректно', 'error');
    }
  });
}

function resetSelection() {
  currentPackage = null;
  selectedCharacters = [];
  selectedShows = [];
  selectedMasterClasses = [];
  document.getElementById('package-selection').classList.remove('active');
  document.getElementById('form-selected-services').innerHTML = '';
  document.querySelectorAll('.character-card, .show-card, .master-card').forEach(card => {
    card.classList.remove('selected');
  });
  updateSelection();
}

function initPhoneMask() {
  const phoneInput = document.getElementById('phone');
  
  phoneInput.addEventListener('input', function(e) {
    let value = this.value.replace(/\D/g, '');
    
    if (value.length > 0) {
      value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7, 9) + '-' + value.substring(9, 11);
    }
    
    this.value = value.substring(0, 18);
  });
}

function initModalClose() {
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.classList.remove('active');
      });
    });
  });
  
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('active');
      }
    });
  });
}

function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

function updateSelection() {
  document.getElementById('characters-count').textContent = selectedCharacters.length;
  document.getElementById('shows-count').textContent = selectedShows.length;
  document.getElementById('master-count').textContent = selectedMasterClasses.length;
  
  updateSelectedServicesPreview();
  updateTotalPrice();
}

function scrollCarousel(id, amount) {
  const carousel = document.getElementById(id);
  carousel.scrollBy({ left: amount, behavior: 'smooth' });
}

function showVideoModal(videoUrl, title) {
  const modal = document.getElementById('video-modal');
  const video = document.getElementById('modal-video');
  const videoTitle = document.getElementById('video-modal-title');
  
  video.src = videoUrl;
  videoTitle.textContent = title;
  modal.classList.add('active');
  
  document.querySelector('#video-modal .close-modal').addEventListener('click', function() {
    video.pause();
  });
}

function updateFormSelectedServices() {
  const formServices = document.getElementById('form-selected-services');
  let html = '<h4>Выбранные услуги:</h4><div class="selected-items">';
  
  html += `<div class="selected-item">Пакет: ${getPackageName(currentPackage)} <span>${document.getElementById('total-price').textContent}₽</span></div>`;
  
  if (selectedCharacters.length > 0) {
    selectedCharacters.forEach(char => {
      html += `<div class="selected-item">${char.name} <span>${char.price}₽</span></div>`;
    });
  }
  
  if (selectedShows.length > 0) {
    selectedShows.forEach(show => {
      html += `<div class="selected-item">${show.name} <span>${show.price}₽</span></div>`;
    });
  }
  
  if (selectedMasterClasses.length > 0) {
    selectedMasterClasses.forEach(master => {
      html += `<div class="selected-item">${master.name} <span>${master.price}₽</span></div>`;
    });
  }
  
  html += '</div>';
  formServices.innerHTML = html;
}

function updateSelectedServicesPreview() {
  const preview = document.getElementById('selected-services');
  let html = '<h4>Выбранные услуги:</h4><div class="selected-items-preview">';
  
  html += `<div class="selected-item-card">
    <div class="selected-item-img" style="background: rgba(214, 196, 155, 0.2); display: flex; align-items: center; justify-content: center;">
      <span style="font-size: 2rem;">📦</span>
    </div>
    <div class="selected-item-name">${getPackageName(currentPackage)}</div>
    <div class="remove-item-btn" onclick="removePackage()">×</div>
  </div>`;
  
  selectedCharacters.forEach(char => {
    const character = charactersData.find(c => c.name === char.name);
    html += `<div class="selected-item-card">
      <img src="${character.image}" alt="${char.name}" class="selected-item-img">
      <div class="selected-item-name">${char.name}</div>
      <div class="remove-item-btn" onclick="removeSelectedItem('character', '${char.name}')">×</div>
    </div>`;
  });
  
  selectedShows.forEach(show => {
    const showData = showsData.find(s => s.name === show.name);
    html += `<div class="selected-item-card">
      <img src="${showData.image}" alt="${show.name}" class="selected-item-img">
      <div class="selected-item-name">${show.name}</div>
      <div class="remove-item-btn" onclick="removeSelectedItem('show', '${show.name}')">×</div>
    </div>`;
  });
  
  selectedMasterClasses.forEach(master => {
    const masterData = masterClassesData.find(m => m.name === master.name);
    html += `<div class="selected-item-card">
      <div class="selected-item-img" style="background: rgba(214, 196, 155, 0.2); display: flex; align-items: center; justify-content: center; font-size: 2rem;">
        ${masterData.icon}
      </div>
      <div class="selected-item-name">${master.name}</div>
      <div class="remove-item-btn" onclick="removeSelectedItem('master', '${master.name}')">×</div>
    </div>`;
  });
  
  html += '</div>';
  preview.innerHTML = html;
  
  window.removePackage = function() {
    currentPackage = null;
    selectedCharacters = [];
    selectedShows = [];
    selectedMasterClasses = [];
    document.getElementById('package-selection').classList.remove('active');
    updateSelection();
  };
  
  window.removeSelectedItem = function(type, name) {
    if (type === 'character') {
      const index = selectedCharacters.findIndex(c => c.name === name);
      if (index !== -1) selectedCharacters.splice(index, 1);
    } else if (type === 'show') {
      const index = selectedShows.findIndex(s => s.name === name);
      if (index !== -1) selectedShows.splice(index, 1);
    } else if (type === 'master') {
      const index = selectedMasterClasses.findIndex(m => m.name === name);
      if (index !== -1) selectedMasterClasses.splice(index, 1);
    }
    updateSelection();
  };
}

function updateTotalPrice() {
  const totalPriceElement = document.getElementById('total-price');
  
  if (currentPackage === 'custom') {
    let total = 0;
    selectedCharacters.forEach(c => total += c.price);
    selectedShows.forEach(s => total += s.price);
    selectedMasterClasses.forEach(m => total += m.price);
    totalPriceElement.textContent = total.toLocaleString('ru-RU');
  } else {
    totalPriceElement.textContent = basePrice.toLocaleString('ru-RU');
  }
}

function getPackageName(packageType) {
  switch(packageType) {
    case 'basic': return 'Базовый';
    case 'standard': return 'Стандарт';
    case 'premium': return 'Премиум';
    case 'custom': return 'Кастомный';
    default: return '';
  }
}

function initGalleryButtons() {
  document.addEventListener('click', function(e) {
    const viewBtn = e.target.closest('.view-btn');
    if (viewBtn) {
      const videoUrl = viewBtn.dataset.video;
      const title = viewBtn.dataset.name;
      if (videoUrl) {
        showVideoModal(videoUrl, title);
      }
    }
    
    const viewCaseBtn = e.target.closest('.view-case-btn');
    if (viewCaseBtn) {
      const caseIndex = Array.from(document.querySelectorAll('.view-case-btn')).indexOf(viewCaseBtn);
      showCaseModal(caseIndex);
    }
    
    const viewProductBtn = e.target.closest('.view-product-btn');
    if (viewProductBtn) {
      const productIndex = Array.from(document.querySelectorAll('.view-product-btn')).indexOf(viewProductBtn);
      showProductModal(productIndex);
    }
  });
}

function initSelectionHandlers() {
  document.querySelectorAll('.character-card, .show-card, .master-card').forEach(card => {
    card.addEventListener('click', function(e) {
      if (e.target.closest('.view-btn')) return;
      
      const type = this.classList.contains('character-card') ? 'character' : 
                  this.classList.contains('show-card') ? 'show' : 'master';
      const name = this.dataset.name;
      
      let data, selectedArray, max;
      
      switch(type) {
        case 'character':
          data = charactersData.find(c => c.name === name);
          selectedArray = selectedCharacters;
          max = maxCharacters;
          break;
        case 'show':
          data = showsData.find(s => s.name === name);
          selectedArray = selectedShows;
          max = maxShows;
          break;
        case 'master':
          data = masterClassesData.find(m => m.name === name);
          selectedArray = selectedMasterClasses;
          max = maxMasterClasses;
          break;
      }
      
      const index = selectedArray.findIndex(item => item.name === name);
      
      if (index === -1) {
        if (selectedArray.length < max || currentPackage === 'custom') {
          selectedArray.push({ name, price: data.price });
          this.classList.add('selected');
          showNotification(`${type === 'character' ? 'Персонаж' : type === 'show' ? 'Шоу' : 'Мастер-класс'} "${name}" добавлен`, 'success');
        } else {
          showNotification(`Можно выбрать не более ${max} ${type === 'character' ? 'персонажей' : type === 'show' ? 'шоу-программ' : 'мастер-классов'}`, 'error');
        }
      } else {
        selectedArray.splice(index, 1);
        this.classList.remove('selected');
      }
      
      updateSelection();
    });
  });
}

function initCarouselNavigation() {
  document.getElementById('characters-prev').addEventListener('click', () => scrollCarousel('characters-slider', -220));
  document.getElementById('characters-next').addEventListener('click', () => scrollCarousel('characters-slider', 220));
  document.getElementById('shows-prev').addEventListener('click', () => scrollCarousel('shows-slider', -220));
  document.getElementById('shows-next').addEventListener('click', () => scrollCarousel('shows-slider', 220));
  document.getElementById('master-prev').addEventListener('click', () => scrollCarousel('master-slider', -220));
  document.getElementById('master-next').addEventListener('click', () => scrollCarousel('master-slider', 220));
}

function showCaseModal(index) {
  const caseData = casesData[index];
  const modal = document.getElementById('case-modal');
  const modalContent = document.getElementById('case-modal-content');
  
  let html = `
    <h3>${caseData.title}</h3>
    <p class="case-modal-description">${caseData.description}</p>
    <div class="case-modal-details">${caseData.details}</div>
    <div class="case-modal-gallery">
  `;
  
  caseData.images.forEach(img => {
    html += `<img src="${img}" alt="${caseData.title}" class="case-modal-image">`;
  });
  
  html += '</div>';
  
  modalContent.innerHTML = html;
  modal.classList.add('active');
}

function showProductModal(index) {
  const productData = productsData[index];
  const modal = document.getElementById('case-modal');
  const modalContent = document.getElementById('case-modal-content');
  
  let html = `
    <h3>${productData.name}</h3>
    <p class="case-modal-description">${productData.description}</p>
    <div class="product-modal-price">${productData.price}</div>
    <div class="case-modal-details">${productData.details}</div>
    <div class="case-modal-gallery">
  `;
  
  productData.images.forEach(img => {
    html += `<img src="${img}" alt="${productData.name}" class="case-modal-image">`;
  });
  
  html += '</div>';
  
  modalContent.innerHTML = html;
  modal.classList.add('active');
}