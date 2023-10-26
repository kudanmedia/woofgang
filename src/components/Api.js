const fetchImages = async (breed, page) => {
    try {
      const endpoint = breed
        ? `https://dog.ceo/api/breed/${breed}/images/random/12?page=${page}`
        : `https://dog.ceo/api/breeds/image/random/12?page=${page}`;
  
      const response = await fetch(endpoint);
      const data = await response.json();
  
      if (data.status === 'success' && Array.isArray(data.message)) {
        return data.message;
      } else {
        console.error('Invalid API response:', data);
        return [];
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      return [];
    }
  };
  
  export { fetchImages };
  