import React, { useState, useEffect, useCallback } from 'react';
import Logo from './woofgang-logo.png';
import DogImage from './DogImage';
import { fetchImages } from './Api';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [breed, setBreed] = useState('');
  const [page, setPage] = useState(1);
  const [searchedBreed, setSearchedBreed] = useState('');

  const handleSearch = async () => {
    setPage(1);
    setSearchedBreed(breed);
    const fetchedImages = await fetchImages(breed, 1);
    setImages(fetchedImages);
  };

  const handleNextPage = () => {
    if (page < 5) {
      setPage(page + 1);
      handleSearch();
    }
  };
  
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      handleSearch();
    }
  };
  

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div>
      <div className="mb-4 bg-red-400 p-4 mx-auto flex justify-between items-center">
        <div>
          <DogImage src={Logo} alt="Woof Gang" />
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter breed (e.g., hound)"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            className="w-96 p-2 border rounded"
          />
          <button onClick={handleSearch} className="bg-black text-white px-4 py-2 rounded ml-2">
            Search
          </button>
        </div>
        <div className="justify-items-end">
          <button
            onClick={handlePreviousPage}
            className="bg-black text-white px-4 py-2 rounded mr-2"
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className="bg-black text-white px-4 py-2 rounded"
            disabled={page === 5}
          >
            Next
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {images.map((imageUrl, index) => (
          <div key={index} className="w-full h-64 overflow-hidden image-place-holder">
            <DogImage src={imageUrl} alt={`Dog ${index}`} />
          </div>
        ))}
      </div>

      <div className="mt-4 text-center bg-red-400 p-4 text-white">
        <p>
          {searchedBreed ? `Showing images for breed: ${searchedBreed}` : 'No specific Woof Gang breed selected'}
        </p>
      </div>
    </div>
  );
};

export default Gallery;