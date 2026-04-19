export function initProjectsScroll() {
  const track = document.getElementById('projects-track');
  if (!track) return;

  let isPaused = false;
  let scrollAmount = 0;
  const speed = 1.0;

  track.addEventListener('mouseenter', () => isPaused = true);
  track.addEventListener('mouseleave', () => isPaused = false);

  function autoScroll() {
    if (!isPaused) {
      scrollAmount += speed;
      if (scrollAmount >= track.scrollWidth / 2) {
        scrollAmount = 0;
      }
      track.scrollLeft = scrollAmount;
    }
    requestAnimationFrame(autoScroll);
  }

  autoScroll();
}