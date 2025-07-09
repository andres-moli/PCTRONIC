// components/PhotoCarouselModal.tsx
import React from 'react';

interface PhotoCarouselModalProps {
  isOpen: boolean;
  photos: string[];
  onClose: () => void;
}

const PhotoCarouselModal: React.FC<PhotoCarouselModalProps> = ({ isOpen, photos, onClose }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  if (!isOpen || photos.length === 0) return null;

  const next = () => setCurrentIndex((prev) => (prev + 1) % photos.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);

  return (
    <div className="fixed inset-0 z-[99999] bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-xl w-full">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">✕</button>

        <div className="flex justify-center items-center">
          <button onClick={prev} className="px-2 text-2xl">←</button>
          <img
            src={photos[currentIndex]}
            alt={`Foto ${currentIndex + 1}`}
            key={photos[currentIndex]}
            className="max-h-[400px] max-w-[90%] object-contain mx-4"
          />
          <button onClick={next} className="px-2 text-2xl">→</button>
        </div>

        <p className="text-center text-sm mt-2">{currentIndex + 1} / {photos.length}</p>
      </div>
    </div>
  );
};

export default PhotoCarouselModal;
