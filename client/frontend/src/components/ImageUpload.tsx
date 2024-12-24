// src/components/ImageUpload.tsx
import React, { useState } from 'react';
import { uploadPicture } from '../api';

export const ImageUpload: React.FC = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);

    setUploading(true);
    try {
      await uploadPicture(formData);
      setTitle('');
      setFile(null);
      // You might want to add a callback to refresh the image gallery
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Upload Image</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Image title"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            accept="image/*"
            className="w-full"
            required
          />
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};