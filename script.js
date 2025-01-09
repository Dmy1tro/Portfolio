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

const sectionsManager = {
    sections: document.querySelectorAll("section"),
    index: 0,

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
        }
    },
    back() {
        if (!this.isFirstSection()) {
            this.index--;
        }
    },
    isLastSection() {
        return this.index === this.sections.length - 1;
    },
    isFirstSection() {
        return this.index === 0;
    }
}

window.addEventListener('wheel', (event$) => {
    const currentSection = sectionsManager.index;

    if (event$.deltaY > 0) {
        sectionsManager.next();
    } else if (event$.deltaY < 0) {
        sectionsManager.back();
    }

    if (sectionsManager.index !== currentSection) {
        sectionsManager.scrollToSection();
    }
});

window.addEventListener('scroll', () => {
    sectionsManager.setSectionByScrollPosition(window.scrollY);
});
