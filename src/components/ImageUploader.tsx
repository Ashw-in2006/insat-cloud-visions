
import React, { useCallback } from 'react';
import { Upload, Cloud, CheckCircle } from 'lucide-react';

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
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <Cloud className="text-blue-500" />
        📤 Upload Satellite Images
      </h2>
      
      <div
        className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center bg-gradient-to-br from-blue-50 to-sky-50 hover:from-blue-100 hover:to-sky-100 transition-all duration-300 cursor-pointer group"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => document.getElementById('image-upload')?.click()}
      >
        <div className="group-hover:scale-105 transition-transform duration-200">
          <Upload className="mx-auto mb-4 text-blue-500 group-hover:text-blue-600" size={48} />
          <p className="text-lg text-gray-700 mb-2 font-medium">
            🌍 Drop your satellite images here or click to browse
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Upload 3-5 sequential satellite images (PNG, JPG) for cloud motion analysis
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm">
            <span>📡 INSAT Compatible</span>
          </div>
        </div>
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
        <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="text-green-500" size={20} />
            <p className="text-sm font-medium text-gray-700">
              ✅ Successfully uploaded {uploadedImages.length} image{uploadedImages.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {uploadedImages.map((file, index) => (
              <div
                key={index}
                className="relative group"
              >
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200 group-hover:border-blue-400 transition-colors">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Uploaded ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1 left-1 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                    #{index + 1}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1 truncate" title={file.name}>
                  {file.name}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-gray-500 text-center">
            🔄 Ready for processing • Temporal sequence: {uploadedImages.length} frames
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
