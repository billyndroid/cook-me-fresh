// STEP 2: FRONTEND IMPLEMENTATION
// This would be your JavaScript for the gallery (e.g., 'instagram-gallery.js')

class InstagramGallery {
    constructor(containerId, options = {}) {
      this.container = document.getElementById(containerId);
      this.options = {
        limit: options.limit || 9,
        columns: options.columns || 3,
        loadingText: options.loadingText || 'Loading Instagram posts...',
        errorText: options.errorText || 'Could not load Instagram posts',
        apiEndpoint: options.apiEndpoint || '/api/instagram-posts',
        ...options
      };
      
      this.init();
    }
    
    async init() {
      if (!this.container) {
        console.error('Instagram gallery container not found');
        return;
      }
      
      this.showLoading();
      try {
        await this.fetchPosts();
        this.renderGallery();
      } catch (error) {
        this.showError(error);
      }
    }
    
    showLoading() {
      this.container.innerHTML = `
        <div class="instagram-gallery-loading">
          <p>${this.options.loadingText}</p>
        </div>
      `;
    }
    
    showError(error) {
      console.error('Instagram gallery error:', error);
      this.container.innerHTML = `
        <div class="instagram-gallery-error">
          <p>${this.options.errorText}</p>
        </div>
      `;
    }
    
    async fetchPosts() {
      const url = `${this.options.apiEndpoint}?limit=${this.options.limit}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.success || !data.posts) {
        throw new Error('Invalid API response');
      }
      
      this.posts = data.posts;
    }
    
    renderGallery() {
      if (!this.posts || this.posts.length === 0) {
        this.container.innerHTML = '<p>No Instagram posts available</p>';
        return;
      }
      
      // Create gallery container
      const gallery = document.createElement('div');
      gallery.className = 'instagram-gallery-grid';
      gallery.style.display = 'grid';
      gallery.style.gridTemplateColumns = `repeat(${this.options.columns}, 1fr)`;
      gallery.style.gap = '10px';
      
      // Add posts to gallery
      this.posts.forEach(post => {
        const item = this.createPostElement(post);
        gallery.appendChild(item);
      });
      
      // Clear and append
      this.container.innerHTML = '';
      this.container.appendChild(gallery);
      
      // Initialize lightbox if option enabled
      if (this.options.lightbox) {
        this.initLightbox();
      }
    }
    
    createPostElement(post) {
      const item = document.createElement('div');
      item.className = 'instagram-gallery-item';
      
      // Handle different media types
      let mediaHtml;
      
      if (post.media_type === 'VIDEO') {
        mediaHtml = `
          <video
            src="${post.media_url}"
            poster="${post.thumbnail_url || ''}"
            controls
          ></video>
        `;
      } else if (post.media_type === 'CAROUSEL_ALBUM') {
        // For albums, just show the first image
        mediaHtml = `<img src="${post.media_url}" alt="${this.getCaption(post)}" />`;
      } else {
        // Default to image
        mediaHtml = `<img src="${post.media_url}" alt="${this.getCaption(post)}" />`;
      }
      
      item.innerHTML = `
        <a href="${post.permalink}" target="_blank" class="instagram-item-link" data-post-id="${post.id}">
          <div class="instagram-item-media">
            ${mediaHtml}
          </div>
          <div class="instagram-item-overlay">
            <div class="instagram-item-caption">
              ${this.getCaption(post)}
            </div>
          </div>
        </a>
      `;
      
      return item;
    }
    
    getCaption(post) {
      // Clean and truncate caption
      if (!post.caption) return '';
      
      const caption = post.caption.replace(/(\r\n|\n|\r)/gm, ' ').trim();
      if (caption.length > 100) {
        return caption.substring(0, 97) + '...';
      }
      return caption;
    }
    
    initLightbox() {
      // Basic lightbox implementation
      // You might want to use an existing lightbox library instead
      document.querySelectorAll('.instagram-item-link').forEach(link => {
        link.addEventListener('click', (e) => {
          if (this.options.lightbox) {
            e.preventDefault();
            const postId = link.getAttribute('data-post-id');
            const post = this.posts.find(p => p.id === postId);
            
            if (post) {
              this.showLightbox(post);
            }
          }
        });
      });
    }
    
    showLightbox(post) {
      // Create lightbox HTML
      const lightbox = document.createElement('div');
      lightbox.className = 'instagram-lightbox';
      lightbox.style.position = 'fixed';
      lightbox.style.top = '0';
      lightbox.style.left = '0';
      lightbox.style.width = '100%';
      lightbox.style.height = '100%';
      lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
      lightbox.style.display = 'flex';
      lightbox.style.justifyContent = 'center';
      lightbox.style.alignItems = 'center';
      lightbox.style.zIndex = '9999';
      
      // Media content
      let mediaHtml;
      if (post.media_type === 'VIDEO') {
        mediaHtml = `
          <video 
            src="${post.media_url}" 
            controls 
            autoplay 
            style="max-width: 90%; max-height: 80vh;"
          ></video>
        `;
      } else {
        mediaHtml = `
          <img 
            src="${post.media_url}" 
            alt="${this.getCaption(post)}" 
            style="max-width: 90%; max-height: 80vh;"
          />
        `;
      }
      
      // Caption and details
      const details = `
        <div style="color: white; max-width: 90%; margin-top: 20px;">
          <p>${post.caption || ''}</p>
          <p><small>Posted on: ${new Date(post.timestamp).toLocaleDateString()}</small></p>
          <a href="${post.permalink}" target="_blank" style="color: #3897f0;">View on Instagram</a>
        </div>
      `;
      
      // Close button
      const closeBtn = `
        <button 
          style="position: absolute; top: 20px; right: 20px; background: none; border: none; color: white; font-size: 24px; cursor: pointer;"
        >×</button>
      `;
      
      // Combine everything
      lightbox.innerHTML = `
        <div style="text-align: center;">
          ${mediaHtml}
          ${details}
          ${closeBtn}
        </div>
      `;
      
      // Add to body
      document.body.appendChild(lightbox);
      
      // Close on button click
      lightbox.querySelector('button').addEventListener('click', () => {
        lightbox.remove();
      });
      
      // Close on background click
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          lightbox.remove();
        }
      });
    }
  }