
import React, { useState } from 'react';
import { CloudRain, Satellite, Cpu } from 'lucide-react';
import ImageUploader from '../components/ImageUploader';
import DiffusionProcessor from '../components/DiffusionProcessor';
import ResultsViewer from '../components/ResultsViewer';

const Index = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [processingResults, setProcessingResults] = useState<any>(null);

  const handleImagesUpload = (files: File[]) => {
    setUploadedImages(files);
    setProcessingResults(null);
  };

  const handleProcessingComplete = (results: any) => {
    setProcessingResults(results);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <CloudRain className="text-blue-500" size={48} />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
              Chase the Cloud
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Advanced Conditional Diffusion Model for INSAT Satellite Cloud Motion Prediction
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Satellite size={16} />
              <span>INSAT Satellite Data</span>
            </div>
            <div className="flex items-center gap-1">
              <Cpu size={16} />
              <span>UNet Diffusion Architecture</span>
            </div>
            <div className="flex items-center gap-1">
              <CloudRain size={16} />
              <span>Atmospheric Modeling</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <ImageUploader
            onImagesUpload={handleImagesUpload}
            uploadedImages={uploadedImages}
          />

          <DiffusionProcessor
            images={uploadedImages}
            onProcessingComplete={handleProcessingComplete}
          />

          <ResultsViewer results={processingResults} />
        </div>

        {/* Technical Details */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Technical Implementation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Model Architecture</h3>
                <ul className="space-y-1">
                  <li>• UNet-based Conditional Diffusion Model</li>
                  <li>• Temporal attention mechanisms</li>
                  <li>• Multi-scale feature extraction</li>
                  <li>• Atmospheric physics constraints</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Processing Pipeline</h3>
                <ul className="space-y-1">
                  <li>• Image preprocessing (resize, normalize)</li>
                  <li>• Temporal sequence encoding</li>
                  <li>• Noise scheduling and sampling</li>
                  <li>• Motion vector prediction</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Evaluation Metrics</h3>
                <ul className="space-y-1">
                  <li>• SSIM: Structural similarity index</li>
                  <li>• MAE: Mean absolute error</li>
                  <li>• PSNR: Peak signal-to-noise ratio</li>
                  <li>• Temporal consistency analysis</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Applications</h3>
                <ul className="space-y-1">
                  <li>• Weather forecasting enhancement</li>
                  <li>• Climate research and analysis</li>
                  <li>• Agricultural planning support</li>
                  <li>• Disaster prediction and monitoring</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p className="text-sm">
            Demonstrating advanced machine learning techniques for atmospheric science
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
