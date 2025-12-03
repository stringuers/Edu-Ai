import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';

const ImageUploader = ({ onImageSelect, preview, onClear }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0]);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full">
      {!preview ? (
        <div
          className={`
            relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
            transition duration-200
            ${dragActive 
              ? 'border-purple-600 bg-purple-50' 
              : 'border-gray-300 hover:border-purple-600 hover:bg-purple-50'
            }
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />

          <div className="flex flex-col items-center space-y-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full">
              <Upload className="w-8 h-8 text-white" />
            </div>

            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">
                Glisse une image ici ou clique pour parcourir
              </p>
              <p className="text-sm text-gray-600">
                Formats supportés: JPG, PNG, WEBP (Max 5MB)
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                JPG
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                PNG
              </span>
              <span className="px-3 py-1 bg-pink-100 text-pink-800 text-xs rounded-full">
                WEBP
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden border-2 border-purple-600 group">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-auto max-h-96 object-contain bg-gray-50"
          />
          
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <button
              onClick={onClear}
              className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition transform hover:scale-110"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
            <ImageIcon className="w-4 h-4 inline mr-1" />
            Image chargée
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;