function toggleMenu() {
    document.querySelector('.hamburger-icon').classList.toggle('open');
    document.querySelector('.menu-links').classList.toggle('open');
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}

window.addEventListener('scroll', () => {
    document.querySelector('.fixed-nav').classList.toggle('fixed-nav-scrolled', window.scrollY > 60);
});

const pageScrollManager = {
    sections: [...document.querySelectorAll('section'), document.querySelector('footer')],
    index: 0,

    get footer() {
        return this.sections[this.sections.length - 1];
    },

    scrollToSection() {
        if (this.isFirstSection()) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            this.sections[this.index].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    },
    setSectionByScrollPosition(scrollPosition) {
        // Footer takes small height therefore it causes bug with scrolling
        // Have to manually check is footer in view
        if (this.isFooterInView()) {
            this.index = this.sections.length - 1;
            return;
        }

        this.sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (
                scrollPosition >= sectionTop - sectionHeight / 2 &&
                scrollPosition < sectionTop + sectionHeight / 2
            ) {
                this.index = index;
            }
        });
    },
    next() {
        if (!this.isLastSection()) {
            this.index++;
            this.scrollToSection();
        }
    },
    back() {
        if (!this.isFirstSection()) {
            this.index--;
            this.scrollToSection();
        }
    },
    isLastSection() {
        return this.index === this.sections.length - 1;
    },
    isFirstSection() {
        return this.index === 0;
    },
    isFooterInView() {
        const rect = this.footer.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}

// Implement throttling to smooth the user interaction
let wheelDebounceTimeout;
window.addEventListener('wheel', (event$) => {
    if (wheelDebounceTimeout) {
        clearTimeout(wheelDebounceTimeout);
    }

    wheelDebounceTimeout = setTimeout(() => {
        if (event$.deltaY > 0) {
            pageScrollManager.next();
        } else if (event$.deltaY < 0) {
            pageScrollManager.back();
        }
    }, 80);
});

window.addEventListener('scrollend', () => {
    setTimeout(() => {
        pageScrollManager.setSectionByScrollPosition(window.scrollY);
    });
});

window.addEventListener('keyup', ($event) => {
    if ($event.key === 'ArrowUp') {
        pageScrollManager.back();
    }

    if ($event.key === 'ArrowDown') {
        pageScrollManager.next();
    }
});
