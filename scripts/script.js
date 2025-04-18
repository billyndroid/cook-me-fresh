// STEP 3: USAGE EXAMPLE


document.addEventListener('DOMContentLoaded', () => {
    // Initialize gallery once DOM is loaded
    const gallery = new InstagramGallery('instagram-feed', {
      limit: 9,
      columns: 3,
      lightbox: true,
    });
    
    // Example of a refresh button
    const refreshButton = document.getElementById('refresh-instagram');
    if (refreshButton) {
      refreshButton.addEventListener('click', () => {
        gallery.init(); // Re-fetch and render
      });
    }
  });
  