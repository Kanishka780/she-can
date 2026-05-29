/**
 * Navigation module
 * Manages sticky navbar scroll states, scrollspy, and mobile drawer accessibility.
 */

export function initNavigation() {
  const header = document.getElementById('header');
  const toggleBtn = document.getElementById('nav-toggle');
  const drawer = document.getElementById('nav-drawer');
  const backdrop = document.getElementById('nav-backdrop');
  const navLinks = document.querySelectorAll('.nav-bar__link, .nav-drawer__link');
  
  if (!header || !toggleBtn || !drawer || !backdrop) return;

  // 1. Sticky Nav on Scroll
  const handleScroll = () => {
    if (window.scrollY > 80) {
      header.classList.add('nav-bar--scrolled');
    } else {
      header.classList.remove('nav-bar--scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check

  // 2. Open / Close Mobile Drawer
  const openDrawer = () => {
    toggleBtn.classList.add('nav-bar__hamburger--active');
    drawer.classList.add('nav-drawer--open');
    backdrop.classList.add('nav-drawer__backdrop--show');
    
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    
    // Focus trapping anchor or first item inside drawer
    const firstLink = drawer.querySelector('.nav-drawer__link');
    if (firstLink) firstLink.focus();
    
    // Bind escape key
    document.addEventListener('keydown', handleEscKey);
  };

  const closeDrawer = () => {
    toggleBtn.classList.remove('nav-bar__hamburger--active');
    drawer.classList.remove('nav-drawer--open');
    backdrop.classList.remove('nav-drawer__backdrop--show');
    
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    
    // Remove escape key listener
    document.removeEventListener('keydown', handleEscKey);
  };

  const toggleDrawer = () => {
    const isOpen = drawer.classList.contains('nav-drawer--open');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  };

  const handleEscKey = (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      toggleBtn.focus();
    }
  };

  toggleBtn.addEventListener('click', toggleDrawer);
  backdrop.addEventListener('click', closeDrawer);

  // Close drawer on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // 3. Scrollspy (IntersectionObserver to highlight active link)
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the upper-middle part of screen
    threshold: 0
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Remove active class from all links
        navLinks.forEach(link => {
          link.classList.remove('nav-bar__link--active', 'nav-drawer__link--active');
          
          // Match link href with section ID
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.classList.add('nav-bar__link--active', 'nav-drawer__link--active');
          }
        });
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach(section => observer.observe(section));
}
