
import React, { useCallback } from 'react';
import { Upload, Cloud } from 'lucide-react';

interface ImageUploaderProps {
  onImagesUpload: (files: File[]) => void;
  uploadedImages: File[];
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImagesUpload, uploadedImages }) => {
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const imageFiles = files.filter(file => 
      file.type.startsWith('image/') && (file.type.includes('png') || file.type.includes('jpeg') || file.type.includes('jpg'))
    );
    
    if (imageFiles.length > 0) {
      onImagesUpload(imageFiles.slice(0, 5)); // Limit to 5 images
    }
  }, [onImagesUpload]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const imageFiles = files.filter(file => 
      file.type.startsWith('image/') && (file.type.includes('png') || file.type.includes('jpeg') || file.type.includes('jpg'))
    );
    
    if (imageFiles.length > 0) {
      onImagesUpload(imageFiles.slice(0, 5));
    }
  }, [onImagesUpload]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
        <Cloud className="text-blue-500" />
        Upload Satellite Images
      </h2>
      
      <div
        className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => document.getElementById('image-upload')?.click()}
      >
        <Upload className="mx-auto mb-4 text-blue-500" size={48} />
        <p className="text-lg text-gray-700 mb-2">
          Drop your satellite images here or click to browse
        </p>
        <p className="text-sm text-gray-500">
          Upload 3-5 sequential satellite images (PNG, JPG) for cloud motion analysis
        </p>
        <input
          id="image-upload"
          type="file"
          multiple
          accept="image/png,image/jpeg,image/jpg"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {uploadedImages.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">
            Uploaded {uploadedImages.length} image{uploadedImages.length !== 1 ? 's' : ''}:
          </p>
          <div className="flex flex-wrap gap-2">
            {uploadedImages.map((file, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {file.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
