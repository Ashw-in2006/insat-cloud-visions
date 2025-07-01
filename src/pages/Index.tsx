
import React, { useState } from 'react';
import { CloudRain, Satellite, Cpu, Zap } from 'lucide-react';
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
      {/* Enhanced Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <CloudRain className="text-blue-500" size={48} />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
              🌩️ Chase the Cloud
            </h1>
            <Zap className="text-yellow-500" size={48} />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
            🤖 Advanced Conditional Diffusion Model for INSAT Satellite Cloud Motion Prediction
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-purple-800 text-sm font-medium">
            <span>🏆 Hackathon Demo Ready</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-gray-500">
            <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm">
              <Satellite size={16} />
              <span>📡 INSAT Satellite Data</span>
            </div>
            <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm">
              <Cpu size={16} />
              <span>🧠 UNet Diffusion Architecture</span>
            </div>
            <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm">
              <CloudRain size={16} />
              <span>🌪️ Atmospheric Modeling</span>
            </div>
          </div>
        </div>

        {/* Main Content in Wide Layout */}
        <div className="max-w-6xl mx-auto">
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

        {/* Enhanced Technical Details */}
        <div className="max-w-6xl mx-auto mt-12">
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <Cpu className="text-purple-500" />
              🔬 Technical Implementation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  🏗️ Model Architecture
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span>UNet-based Conditional Diffusion Model</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span>Temporal attention mechanisms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span>Multi-scale feature extraction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span>Atmospheric physics constraints</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  ⚙️ Processing Pipeline
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span>Image preprocessing (resize, normalize)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span>Temporal sequence encoding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span>Noise scheduling and sampling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span>Motion vector prediction</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                  📊 Evaluation Metrics
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500">•</span>
                    <span>SSIM: Structural similarity index</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500">•</span>
                    <span>MAE: Mean absolute error</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500">•</span>
                    <span>PSNR: Peak signal-to-noise ratio</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500">•</span>
                    <span>Temporal consistency analysis</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
                  🎯 Applications
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    <span>Weather forecasting enhancement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    <span>Climate research and analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    <span>Agricultural planning support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    <span>Disaster prediction and monitoring</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg border border-gray-200 mb-4">
            <span className="text-2xl">🚀</span>
            <span className="text-gray-700 font-medium">Demonstrating advanced ML for atmospheric science</span>
            <span className="text-2xl">🌍</span>
          </div>
          <p className="text-sm text-gray-500">
            Ready for deployment on Streamlit Cloud • No external database required
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
