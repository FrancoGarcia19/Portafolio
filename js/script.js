document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.nav-item');
  const mobileBtn = document.getElementById('mobile-nav-toggle');
  const navList = document.getElementById('nav-list');

  let currentActiveContent = null;

  function hideAllContent(callback) {
    if (currentActiveContent) {
      currentActiveContent.classList.add('slide-out');

      currentActiveContent.addEventListener('animationend', () => {
        currentActiveContent.style.display = 'none';
        currentActiveContent.classList.remove('slide-out');
        if (callback) callback();
      }, { once: true });
    } else if (callback) {
      callback();
    }
  }

  function showContent(contentId) {
    const contentToShow = document.getElementById(contentId);
    if (!contentToShow) return;

    hideAllContent(() => {
      contentToShow.style.display = 'block';
      contentToShow.classList.add('slide-in');
      currentActiveContent = contentToShow;

      contentToShow.addEventListener('animationend', () => {
        contentToShow.classList.remove('slide-in');
      }, { once: true });
    });
  }

  function updateActiveItem(selectedItem) {
    navItems.forEach(item => item.classList.remove('active'));
    selectedItem.classList.add('active');
  }

  // Navigation click
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      updateActiveItem(item);
      showContent(item.getAttribute('data-content'));

      // Close mobile menu after selection
      if (window.innerWidth <= 900 && navList.classList.contains('open')) {
        navList.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Default
  if (navItems.length) {
    updateActiveItem(navItems[0]);
    showContent(navItems[0].getAttribute('data-content'));
  }

  // Name letter jump
  document.querySelectorAll('#animatedName span').forEach(letter => {
    letter.addEventListener('mouseenter', () => {
      letter.classList.add('jump');
    });
    letter.addEventListener('animationend', () => {
      letter.classList.remove('jump');
    });
  });

  // Mobile menu toggle
  if (mobileBtn && navList) {
    mobileBtn.addEventListener('click', () => {
      const expanded = mobileBtn.getAttribute('aria-expanded') === 'true';
      mobileBtn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      navList.classList.toggle('open');
    });
  }
});