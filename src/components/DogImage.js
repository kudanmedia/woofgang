import React from 'react';

const DogImage = ({ src, alt }) => (
  <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy"/>
);

export default DogImage;
