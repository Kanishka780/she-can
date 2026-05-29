/**
 * Carousel module
 * Implements a responsive story carousel with touch/swipe support, autoplay,
 * pause-on-hover, and accessible indicators.
 */

export function initCarousel() {
  const carousel = document.getElementById('story-carousel');
  const track = document.getElementById('carousel-track');
  const slides = Array.from(track ? track.children : []);
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dotsContainer = document.getElementById('carousel-dots');

  if (!carousel || !track || slides.length === 0 || !prevBtn || !nextBtn || !dotsContainer) return;

  let currentIndex = 0;
  let slidesVisible = 1;
  let maxIndex = 0;
  let autoplayTimer = null;
  const autoplayDelay = 5000;

  // Calculate responsiveness dimensions
  const updateLayout = () => {
    const width = window.innerWidth;
    if (width >= 1024) {
      slidesVisible = 3;
    } else if (width >= 640) {
      slidesVisible = 2;
    } else {
      slidesVisible = 1;
    }

    maxIndex = Math.max(0, slides.length - slidesVisible);
    
    // Ensure index doesn't exceed new boundaries
    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }

    renderDots();
    moveToSlide(currentIndex);
    toggleNavButtons();
  };

  // Render navigation dots dynamically
  const renderDots = () => {
    dotsContainer.innerHTML = '';
    
    // If all slides are visible, don't show dots
    if (maxIndex === 0) return;

    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement('button');
      dot.classList.add('carousel__dot');
      dot.setAttribute('role', 'button');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      if (i === currentIndex) {
        dot.classList.add('carousel__dot--active');
        dot.setAttribute('aria-current', 'true');
      }
      
      dot.addEventListener('click', () => {
        currentIndex = i;
        moveToSlide(currentIndex);
        resetAutoplay();
      });
      
      dotsContainer.appendChild(dot);
    }
  };

  const toggleNavButtons = () => {
    if (maxIndex === 0) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
      return;
    }
    
    prevBtn.style.display = 'flex';
    nextBtn.style.display = 'flex';
    
    // Mute/unmute buttons based on boundaries
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === maxIndex;
    
    prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
    nextBtn.style.opacity = currentIndex === maxIndex ? '0.5' : '1';
  };

  const moveToSlide = (index) => {
    const slideWidth = 100 / slidesVisible;
    track.style.transform = `translateX(-${index * slideWidth}%)`;
    
    // Update active dots
    const dots = Array.from(dotsContainer.children);
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('carousel__dot--active');
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.classList.remove('carousel__dot--active');
        dot.removeAttribute('aria-current');
      }
    });

    toggleNavButtons();
  };

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      currentIndex++;
    } else {
      currentIndex = 0; // Wrap around
    }
    moveToSlide(currentIndex);
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = maxIndex; // Wrap around
    }
    moveToSlide(currentIndex);
  };

  // Button Listeners
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoplay();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
  });

  // 1. Touch/Swipe Support
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    pauseAutoplay();
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    const diff = startX - currentX;
    
    if (Math.abs(diff) > 50) { // Threshold for swipe
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    startAutoplay();
  };

  track.addEventListener('touchstart', handleTouchStart, { passive: true });
  track.addEventListener('touchmove', handleTouchMove, { passive: true });
  track.addEventListener('touchend', handleTouchEnd);

  // 2. Autoplay & Hover Pause (Accessibility)
  const startAutoplay = () => {
    if (maxIndex === 0) return; // Don't slide if everything fits
    autoplayTimer = setInterval(nextSlide, autoplayDelay);
  };

  const pauseAutoplay = () => {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  };

  const resetAutoplay = () => {
    pauseAutoplay();
    startAutoplay();
  };

  // Pause on mouse hover or element focus
  carousel.addEventListener('mouseenter', pauseAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
  carousel.addEventListener('focusin', pauseAutoplay);
  carousel.addEventListener('focusout', startAutoplay);

  // Initialize
  updateLayout();
  window.addEventListener('resize', updateLayout);
  startAutoplay();
}
