// src/components/ImageGallery.tsx
import React, { useState, useEffect } from 'react';
import { Picture } from '../types';
import { getPictures, addToFavorites, removeFromFavorites } from '../api';

export const ImageGallery: React.FC = () => {
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadPictures();
  }, [page]);

  const loadPictures = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPictures(page);
      // Make sure we're setting an empty array if no pictures are returned
      setPictures(data || []);
    } catch (error) {
      console.error('Failed to load pictures:', error);
      setError('Failed to load pictures. Please try again later.');
      setPictures([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async (pictureId: string, isFavorite: boolean) => {
    try {
      if (isFavorite) {
        await removeFromFavorites(pictureId);
      } else {
        await addToFavorites(pictureId);
      }
      // Refresh pictures after favoriting
      loadPictures();
    } catch (error) {
      console.error('Failed to update favorite:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (pictures.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">No pictures found. Try uploading some!</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pictures.map((picture) => (
          <div key={picture._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={`http://localhost:5000${picture.url}`}
              alt={picture.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{picture.title}</h3>
              <button
                onClick={() => handleFavorite(picture._id, false)}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Add to Favorites
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {pictures.length > 0 && (
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => setPage(prev => Math.max(1, prev - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">Page {page}</span>
          <button
            onClick={() => setPage(prev => prev + 1)}
            className="px-4 py-2 bg-gray-200 rounded-md"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};