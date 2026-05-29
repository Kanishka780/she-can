/**
 * CountUp module
 * Animates metric numbers counting up to their target values when entering viewport.
 */

export function initCountUp() {
  const metricsSection = document.getElementById('impact-metrics');
  const numberElements = document.querySelectorAll('.impact-strip__number');

  if (!metricsSection || numberElements.length === 0) return;

  let animated = false;

  const animateNumbers = () => {
    const duration = 2000; // Animation duration in ms

    numberElements.forEach(el => {
      const targetValue = parseInt(el.getAttribute('data-target'), 10);
      if (isNaN(targetValue)) return;

      const startTime = performance.now();

      const updateNumber = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Ease-out quad function: progress * (2 - progress)
        const easeProgress = progress * (2 - progress);
        const currentValue = Math.floor(easeProgress * targetValue);

        // Format outputs (add '+' suffix for larger counts)
        if (targetValue >= 100) {
          el.textContent = `${currentValue}+`;
        } else {
          el.textContent = currentValue;
        }

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          // Ensure exact target is set at completion
          el.textContent = targetValue >= 100 ? `${targetValue}+` : targetValue;
        }
      };

      requestAnimationFrame(updateNumber);
    });
  };

  const observerOptions = {
    root: null,
    threshold: 0.2 // Trigger when 20% of metrics bar is visible
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        animateNumbers();
        // Stop observing once animation triggers
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  observer.observe(metricsSection);
}
