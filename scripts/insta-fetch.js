// Fetch posts from Instagram Graph API
async function fetchInstagramPosts() {
    const accessToken = 'YOUR_ACCESS_TOKEN';
    const userId = 'YOUR_INSTAGRAM_BUSINESS_ACCOUNT_ID';
    const fields = 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username';
    const limit = 10;
    
    const url = `https://graph.instagram.com/v12.0/${userId}/media?fields=${fields}&access_token=${accessToken}&limit=${limit}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.data; // Returns array of posts
    } catch (error) {
      console.error('Error fetching Instagram posts:', error);
      return [];
    }
  }