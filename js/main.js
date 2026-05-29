/**
 * Main coordinator module
 * Initializes all sub-modules (Nav, Timeline, Carousel, Tabs, Countup, Form)
 * and handles program details modal overlays.
 */

import { initNavigation } from './nav.js';
import { initTimeline } from './timeline.js';
import { initCarousel } from './carousel.js';
import { initTabs } from './tabs.js';
import { initCountUp } from './countup.js';
import { initForm } from './form.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Sub-modules
  initNavigation();
  initTimeline();
  initCarousel();
  initTabs();
  initCountUp();
  initForm();

  // 2. Initialize AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 600,
      once: true,
      easing: 'ease-out',
      offset: 50,
      disable: window.innerWidth < 768 // Disable on small/mobile screens for performance
    });
  }

  // 3. Accessible Program Modal Controller (using HTML5 native <dialog>)
  const programCards = document.querySelectorAll('.program-card');
  const modals = document.querySelectorAll('.modal');

  programCards.forEach(card => {
    const btn = card.querySelector('.program-card__link');
    const programId = card.getAttribute('data-program');
    const modal = document.getElementById(`modal-${programId}`);

    if (!modal) return;

    // Trigger modal open
    const openModal = () => {
      modal.showModal();
      
      // Store trigger button to return focus later
      modal.setAttribute('data-trigger-id', btn ? btn.id || '' : '');
      
      // Focus on first focusable element inside modal (close button)
      const closeBtn = modal.querySelector('.modal__close');
      if (closeBtn) closeBtn.focus();
    };

    card.addEventListener('click', (e) => {
      // Don't open if clicked element is an interactive link that handles focus differently
      if (e.target.tagName === 'A' && !e.target.classList.contains('program-card__link')) return;
      openModal();
    });

    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent card double click trigger
        openModal();
      });
    }
  });

  // Modal close buttons and backdrop dismissals
  modals.forEach(modal => {
    const closeBtn = modal.querySelector('.modal__close');
    
    const closeModal = () => {
      modal.close();
      
      // Restore focus to card details trigger
      const triggerId = modal.getAttribute('data-trigger-id');
      if (triggerId) {
        const trigger = document.getElementById(triggerId);
        if (trigger) trigger.focus();
      }
    };

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    // Dismiss modal on clicking outside the modal box boundary (the dialog backdrop)
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Handle Esc key natively closed modal clean up of focuses
    modal.addEventListener('cancel', () => {
      // Native close triggers cancel event, sync focus restoration
      setTimeout(() => {
        const triggerId = modal.getAttribute('data-trigger-id');
        if (triggerId) {
          const trigger = document.getElementById(triggerId);
          if (trigger) trigger.focus();
        }
      }, 50);
    });
  });
});
