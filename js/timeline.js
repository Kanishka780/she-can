/**
 * Timeline module
 * Handles SVG line drawing animation on scroll and active status transitions for timeline steps.
 */

export function initTimeline() {
  const timeline = document.querySelector('.timeline');
  const path = document.getElementById('timeline-path');
  const steps = document.querySelectorAll('.timeline__step');
  
  if (!timeline || !path || steps.length === 0) return;

  // Initialize SVG path drawing
  let pathLength = 0;
  
  const setupPath = () => {
    // Force recalculating SVG dimensions
    pathLength = path.getTotalLength();
    path.style.strokeDasharray = `${pathLength} ${pathLength}`;
    path.style.strokeDashoffset = pathLength;
  };

  // Run initial path setup
  setupPath();
  
  // Recalculate on window resize
  window.addEventListener('resize', setupPath);

  // 1. IntersectionObserver for card and node activation
  const stepOptions = {
    root: null,
    rootMargin: '0px 0px -40% 0px', // Trigger when step is 60% from the top of the viewport
    threshold: 0.15
  };

  const stepCallback = (entries) => {
    entries.forEach(entry => {
      const step = entry.target;
      if (entry.isIntersecting) {
        step.classList.add('timeline__step--active');
        step.querySelector('.timeline__node').setAttribute('aria-expanded', 'true');
      }
    });
  };

  const stepObserver = new IntersectionObserver(stepCallback, stepOptions);
  steps.forEach(step => stepObserver.observe(step));

  // 2. Scroll listener for fluid SVG line drawing
  const handleScroll = () => {
    const rect = timeline.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Set scroll trigger threshold (60% down the screen)
    const threshold = viewportHeight * 0.6;
    
    // Find first and last steps to bound the drawing
    const firstStep = steps[0];
    const lastStep = steps[steps.length - 1];
    
    const firstNodeRect = firstStep.querySelector('.timeline__node').getBoundingClientRect();
    const lastNodeRect = lastStep.querySelector('.timeline__node').getBoundingClientRect();
    
    // Y-coordinate of first and last node centers relative to the timeline element
    const timelineTopY = firstNodeRect.top + (firstNodeRect.height / 2) - rect.top;
    const timelineBottomY = lastNodeRect.top + (lastNodeRect.height / 2) - rect.top;
    
    const activeTimelineHeight = timelineBottomY - timelineTopY;
    
    // How far has the threshold scrolled past the first node
    const scrolledOffset = threshold - (firstNodeRect.top + firstNodeRect.height / 2);
    
    // Calculate scroll percentage through the timeline segment
    let progress = scrolledOffset / activeTimelineHeight;
    progress = Math.max(0, Math.min(1, progress));
    
    // Update path stroke-dashoffset
    path.style.strokeDashoffset = pathLength - (progress * pathLength);
  };

  window.addEventListener('scroll', handleScroll);
  // Trigger initial check
  setTimeout(handleScroll, 100);
}
