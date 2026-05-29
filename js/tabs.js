/**
 * Tabs module
 * Manages tab switching in the "How Can You Help" section, with full keyboard navigation (arrows, home/end).
 */

export function initTabs() {
  const tabList = document.querySelector('[role="tablist"]');
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

  if (!tabList || tabs.length === 0 || panels.length === 0) return;

  const selectTab = (targetTab) => {
    tabs.forEach(tab => {
      const isTarget = tab === targetTab;
      tab.classList.toggle('help__tab-btn--active', isTarget);
      tab.setAttribute('aria-selected', isTarget ? 'true' : 'false');
      tab.setAttribute('tabindex', isTarget ? '0' : '-1');
    });

    const activePanelId = targetTab.getAttribute('aria-controls');
    panels.forEach(panel => {
      const isTarget = panel.getAttribute('id') === activePanelId;
      panel.classList.toggle('tab-panel--active', isTarget);
    });
  };

  // Keyboard navigation within tab list
  const handleKeyDown = (e) => {
    const currentTab = document.activeElement;
    const currentIndex = tabs.indexOf(currentTab);
    
    if (currentIndex === -1) return;

    let nextIndex = currentIndex;

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = currentIndex - 1 < 0 ? tabs.length - 1 : currentIndex - 1;
        e.preventDefault();
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = currentIndex + 1 >= tabs.length ? 0 : currentIndex + 1;
        e.preventDefault();
        break;
      case 'Home':
        nextIndex = 0;
        e.preventDefault();
        break;
      case 'End':
        nextIndex = tabs.length - 1;
        e.preventDefault();
        break;
      default:
        return; // Exit handler
    }

    const nextTab = tabs[nextIndex];
    nextTab.focus();
    selectTab(nextTab);
  };

  // Bind Click and Keydown
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      selectTab(e.currentTarget);
    });
  });

  tabList.addEventListener('keydown', handleKeyDown);

  // Awareness kit download click simulator
  const downloadKitBtn = document.getElementById('btn-download-kit');
  if (downloadKitBtn) {
    downloadKitBtn.addEventListener('click', () => {
      // Simulate download feedback
      showNotification('Success', 'Awareness Kit downloaded! Help us share the message on social media.');
    });
  }
}

// Utility to fire notification toast (assumes global availability or implementation)
function showNotification(type, message) {
  const toast = document.getElementById('toast-notify');
  const toastMessage = document.getElementById('toast-message');
  const toastIcon = document.getElementById('toast-icon');

  if (!toast || !toastMessage || !toastIcon) return;

  toastMessage.textContent = message;
  
  if (type === 'Error') {
    toast.classList.add('toast--error');
    toastIcon.className = 'fa-solid fa-circle-xmark';
  } else {
    toast.classList.remove('toast--error');
    toastIcon.className = 'fa-solid fa-circle-check';
  }

  toast.classList.add('toast--show');

  setTimeout(() => {
    toast.classList.remove('toast--show');
  }, 4000);
}
export { showNotification };
