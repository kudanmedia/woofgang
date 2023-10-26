import React, { useState, useEffect } from 'react';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  const fetchImages = async () => {
    try {
      const response = await fetch(`https://dog.ceo/api/breeds/image/random/10?page=${page}`);
      const data = await response.json();
      setImages(data.message);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  const handleNextPage = () => {
    if (page < 5) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {images.map((imageUrl, index) => (
          <div key={index}>
            <img src={imageUrl} alt={`Dog ${index}`} className="w-full h-auto" />
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <button onClick={handlePreviousPage} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
          Previous
        </button>
        <button onClick={handleNextPage} className="bg-blue-500 text-white px-4 py-2 rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default Gallery;
