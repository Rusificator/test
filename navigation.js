

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('.nav');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const contactBtn = document.getElementById('openFeedbackBtn');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalCloseBtn = document.getElementById('modalCloseBtn');

    // Открытие/закрытие мобильного меню
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            const isOpen = nav.classList.contains('active');
            
            // Закрываем все открытые выпадающие меню
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('active');
            });
            
            // Закрываем все активные кнопки выпадающих меню
            document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
                toggle.classList.remove('active');
            });
            
            if (!isOpen) {
                // Открываем меню
                nav.classList.add('active');
                mobileMenuBtn.classList.add('active');
                document.body.classList.add('menu-open');
            } else {
                // Закрываем меню
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // Обработка выпадающих меню на мобильных
    if (dropdownToggles) {
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const dropdownMenu = this.nextElementSibling;
                    const isActive = dropdownMenu.classList.contains('active');
                    
                    // Закрываем все другие выпадающие меню
                    document.querySelectorAll('.dropdown-menu').forEach(menu => {
                        if (menu !== dropdownMenu) {
                            menu.classList.remove('active');
                        }
                    });
                    
                    // Убираем активный класс у других кнопок
                    document.querySelectorAll('.dropdown-toggle').forEach(otherToggle => {
                        if (otherToggle !== this) {
                            otherToggle.classList.remove('active');
                        }
                    });
                    
                    // Переключаем текущее меню
                    if (isActive) {
                        dropdownMenu.classList.remove('active');
                        this.classList.remove('active');
                    } else {
                        dropdownMenu.classList.add('active');
                        this.classList.add('active');
                    }
                }
            });
        });
    }

    // Закрытие меню при клике на ссылку (для мобильных)
    if (nav) {
        const navLinks = nav.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    // Закрываем меню
                    nav.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    
                    // Закрываем все выпадающие меню
                    document.querySelectorAll('.dropdown-menu').forEach(menu => {
                        menu.classList.remove('active');
                    });
                    
                    // Убираем активный класс у всех кнопок выпадающих меню
                    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
                        toggle.classList.remove('active');
                    });
                }
            });
        });
    }

    // Обработка кнопки "Связь с нами"
    if (contactBtn && modalBackdrop) {
        contactBtn.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                // На мобильных закрываем меню перед открытием модального окна
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            }
            modalBackdrop.style.display = 'flex';
            setTimeout(() => {
                modalBackdrop.classList.add('active');
            }, 10);
        });
    }

    // Закрытие модального окна
    if (modalCloseBtn && modalBackdrop) {
        modalCloseBtn.addEventListener('click', function() {
            modalBackdrop.classList.remove('active');
            setTimeout(() => {
                modalBackdrop.style.display = 'none';
            }, 300);
        });
    }

    // Закрытие модального окна при клике на затемнение
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                setTimeout(() => {
                    this.style.display = 'none';
                }, 300);
            }
        });
    }

    // Закрытие меню при клике вне его области (для мобильных)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && nav && nav.classList.contains('active')) {
            const isClickInsideNav = nav.contains(e.target);
            const isClickOnMenuBtn = mobileMenuBtn.contains(e.target);
            
            if (!isClickInsideNav && !isClickOnMenuBtn) {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.classList.remove('menu-open');
                
                // Закрываем все выпадающие меню
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.classList.remove('active');
                });
                
                // Убираем активный класс у всех кнопок выпадающих меню
                document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
                    toggle.classList.remove('active');
                });
            }
        }
    });

    // Закрытие выпадающего меню при клике вне его (для десктопа)
    document.addEventListener('click', function(e) {
        if (window.innerWidth > 768) {
            const dropdowns = document.querySelectorAll('.nav-item.dropdown');
            dropdowns.forEach(dropdown => {
                if (!dropdown.contains(e.target)) {
                    const menu = dropdown.querySelector('.dropdown-menu');
                    if (menu) {
                        menu.style.opacity = '0';
                        menu.style.visibility = 'hidden';
                        menu.style.transform = 'translateY(-10px)';
                    }
                }
            });
        }
    });

    // Закрытие меню при изменении размера окна
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // На десктопе убираем мобильные классы
            if (nav) {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
            
            // Закрываем все выпадающие меню
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('active');
                // Возвращаем стили для десктопа
                menu.style.opacity = '';
                menu.style.visibility = '';
                menu.style.transform = '';
                menu.style.maxHeight = '';
            });
            
            // Убираем активный класс у всех кнопок выпадающих меню
            document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
                toggle.classList.remove('active');
            });
        }
    });
});            });
        }
    }
    
    toggleMobileMenu() {
        this.mobileMenuBtn.classList.toggle('active');
        this.nav.classList.toggle('active');
        document.body.style.overflow = this.nav.classList.contains('active') ? 'hidden' : '';
    }
    
    closeMobileMenu() {
        this.mobileMenuBtn.classList.remove('active');
        this.nav.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Модальное окно
    initModal() {
        if (this.openFeedbackBtn && this.modalCloseBtn && this.modal) {
            // Открытие модального окна
            this.openFeedbackBtn.addEventListener('click', () => {
                this.openModal();
            });
            
            // Закрытие по кнопке
            this.modalCloseBtn.addEventListener('click', () => {
                this.closeModal();
            });
            
            // Закрытие по клику вне окна
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
            
            // Закрытие по клавише Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                    this.closeModal();
                }
            });
        }
    }
    
    openModal() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.closeMobileMenu();
    }
    
    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Выпадающее меню
    initDropdownMenu() {
        if (this.dropdown) {
            const dropdownToggle = this.dropdown.querySelector('.dropdown-toggle');
            const dropdownMenu = this.dropdown.querySelector('.dropdown-menu');
            
            // Создание элементов выпадающего меню
            dropdownData.forEach(item => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                
                a.href = item.href;
                a.className = 'dropdown-link';
                a.innerHTML = `
                    <span class="dropdown-icon">${item.icon}</span>
                    ${item.text}
                `;
                
                li.appendChild(a);
                dropdownMenu.appendChild(li);
            });
            
            // Открытие/закрытие на десктопе
            dropdownToggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.stopPropagation();
                    const isActive = dropdownMenu.style.maxHeight;
                    dropdownMenu.style.maxHeight = isActive ? null : dropdownMenu.scrollHeight + 'px';
                }
            });
            
            // Закрытие при клике вне меню
            document.addEventListener('click', (e) => {
                if (!this.dropdown.contains(e.target)) {
                    dropdownMenu.style.maxHeight = null;
                }
            });
            
            // Обработка для мобильных устройств
            if (window.innerWidth <= 768) {
                dropdownMenu.style.maxHeight = null;
            }
            
            // Адаптация при изменении размера окна
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    dropdownMenu.style.maxHeight = null;
                }
            });
        }
    }
    
    // Плавная прокрутка
    initSmoothScroll() {
         const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Пропускаем якорь "#"
            if (href === '#') return;
            
            // Пропускаем ссылки на другие страницы
            if (href.includes('.html')) return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Обновление активной ссылки
                this.updateActiveLink(link);
            }
        });
    });
        
        
        
    

// Обработка кнопки "Смотреть всю галерею"
 const viewGalleryBtn = document.getElementById('viewGalleryBtn');
    if (viewGalleryBtn) {
        viewGalleryBtn.addEventListener('click', () => {
            // В демо-версии просто скроллим к галерее
            const gallerySection = document.querySelector('.auto-gallery-section');
            if (gallerySection) {
                window.scrollTo({
                    top: gallerySection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
    }
    
    updateActiveLink(clickedLink) {
        // Удаляем активный класс у всех ссылок
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Добавляем активный класс к нажатой ссылке
        clickedLink.classList.add('active');
    }
    
    // Обработчики кликов вне элементов
    initOutsideClickHandlers() {
        // Закрытие мобильного меню при клике вне его
        document.addEventListener('click', (e) => {
            if (this.nav && this.mobileMenuBtn) {
                if (!this.nav.contains(e.target) && !this.mobileMenuBtn.contains(e.target) && this.nav.classList.contains('active')) {
                    this.closeMobileMenu();
                }
            }
        });
    }
}

// Инициализация навигации при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    window.navigation = new Navigation();

});
