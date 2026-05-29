/**
 * Form module
 * Manages email signups, form validation, submit states, and success state views.
 */

import { showNotification } from './tabs.js';

export function initForm() {
  const form = document.getElementById('signup-form');
  const emailInput = document.getElementById('volunteer-email');
  const submitBtn = document.getElementById('submit-btn');
  const formBox = document.getElementById('volunteer-form-box');
  const successBox = document.getElementById('volunteer-success-box');
  const submittedEmailSpan = document.getElementById('submitted-email');
  const resetBtn = document.getElementById('reset-form-btn');

  if (!form || !emailInput || !submitBtn || !formBox || !successBox || !submittedEmailSpan || !resetBtn) return;

  const validateEmail = (email) => {
    // Standard robust email regex
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase().trim());
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailValue = emailInput.value.trim();

    // 1. Basic validation
    if (!emailValue) {
      showNotification('Error', 'Please enter your email address.');
      emailInput.focus();
      return;
    }

    if (!validateEmail(emailValue)) {
      showNotification('Error', 'Please enter a valid email address.');
      emailInput.focus();
      return;
    }

    // 2. Submit States (Disabling interactions)
    submitBtn.disabled = true;
    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Submitting... <i class="fa-solid fa-circle-notch fa-spin"></i>';
    emailInput.disabled = true;

    // 3. Simulate API Call
    setTimeout(() => {
      // Success feedback
      showNotification('Success', 'Thank you! We will be in touch soon.');
      
      // Inject submitted email into success message
      submittedEmailSpan.textContent = emailValue;

      // Soft transition from form to success view
      formBox.style.display = 'none';
      successBox.style.display = 'block';
      
      // Focus on success container for screen reader announcements
      successBox.setAttribute('tabindex', '-1');
      successBox.focus();

      // Restore submit buttons for reset compatibility
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
      emailInput.disabled = false;
    }, 1200);
  });

  // Reset form status to receive another email
  resetBtn.addEventListener('click', () => {
    form.reset();
    
    // Hide success and display form
    successBox.style.display = 'none';
    formBox.style.display = 'block';
    
    // Set focus back to input
    emailInput.focus();
  });
}
