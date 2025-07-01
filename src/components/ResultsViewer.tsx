
import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, TrendingUp, Eye, Brain, AlertCircle } from 'lucide-react';

interface ResultsViewerProps {
  results: {
    inputImages: string[];
    predictedFrames: string[];
    metrics: {
      ssim: number;
      mae: number;
      psnr: number;
    };
    processingTime: string;
  } | null;
}

const ResultsViewer: React.FC<ResultsViewerProps> = ({ results }) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPredictions, setShowPredictions] = useState(true);

  useEffect(() => {
    if (isPlaying && results) {
      const totalFrames = results.inputImages.length + (showPredictions ? results.predictedFrames.length : 0);
      const interval = setInterval(() => {
        setCurrentFrame(prev => (prev + 1) % totalFrames);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, results, showPredictions]);

  if (!results) {
    return null;
  }

  const allFrames = showPredictions 
    ? [...results.inputImages, ...results.predictedFrames]
    : results.inputImages;

  const currentImage = allFrames[currentFrame];
  const isCurrentFramePredicted = showPredictions && currentFrame >= results.inputImages.length;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <Eye className="text-green-500" />
        🌩️ Cloud Motion Prediction Results
      </h2>

      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-lg">
        {/* Simulation Notice */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="text-blue-600" size={20} />
            <AlertCircle className="text-blue-600" size={16} />
            <span className="font-semibold text-blue-800">🧠 Simulated Prediction</span>
          </div>
          <p className="text-sm text-blue-700">
            This is a mock demonstration. Real conditional diffusion model will replace this simulation soon!
          </p>
        </div>

        {/* Image Grid Display */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">📤 Uploaded Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {results.inputImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Input ${index + 1}`}
                  className="w-full aspect-square object-cover rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-colors"
                />
                <div className="absolute top-1 left-1 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                  Input {index + 1}
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold mb-4 text-gray-700">🔮 Predicted Frames</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {results.predictedFrames.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Prediction ${index + 1}`}
                  className="w-full aspect-square object-cover rounded-lg border-2 border-green-200 hover:border-green-400 transition-colors"
                />
                <div className="absolute top-1 left-1 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                  Predicted {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Animation Controls */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">🎬 Animation Player</h3>
          
          <div className="relative mb-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200 max-w-sm mx-auto">
              <img
                src={currentImage}
                alt={`Frame ${currentFrame + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                Frame {currentFrame + 1}/{allFrames.length}
                {isCurrentFramePredicted && (
                  <span className="ml-2 bg-green-500 px-1 rounded text-xs">🔮 PREDICTED</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentFrame(0)}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                title="Go to start"
              >
                <SkipBack size={20} />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <button
                onClick={() => setCurrentFrame(allFrames.length - 1)}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                title="Go to end"
              >
                <SkipForward size={20} />
              </button>
            </div>

            <div className="flex items-center gap-2 flex-1">
              <span className="text-sm text-gray-600 whitespace-nowrap">Frame:</span>
              <input
                type="range"
                min="0"
                max={allFrames.length - 1}
                value={currentFrame}
                onChange={(e) => setCurrentFrame(parseInt(e.target.value))}
                className="flex-1"
              />
            </div>
          </div>
        </div>

        {/* Enhanced Metrics */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">📊 Evaluation Metrics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="text-blue-600" size={20} />
                <span className="font-semibold text-blue-800">SSIM</span>
              </div>
              <div className="text-3xl font-bold text-blue-700 mb-1">
                {results.metrics.ssim.toFixed(3)}
              </div>
              <div className="text-xs text-blue-600">Structural Similarity</div>
              <div className="text-xs text-blue-500 mt-1">Higher is better</div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="text-green-600" size={20} />
                <span className="font-semibold text-green-800">MAE</span>
              </div>
              <div className="text-3xl font-bold text-green-700 mb-1">
                {results.metrics.mae.toFixed(3)}
              </div>
              <div className="text-xs text-green-600">Mean Absolute Error</div>
              <div className="text-xs text-green-500 mt-1">Lower is better</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="text-purple-600" size={20} />
                <span className="font-semibold text-purple-800">PSNR</span>
              </div>
              <div className="text-3xl font-bold text-purple-700 mb-1">
                {results.metrics.psnr.toFixed(1)} dB
              </div>
              <div className="text-xs text-purple-600">Peak Signal-to-Noise</div>
              <div className="text-xs text-purple-500 mt-1">Higher is better</div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="text-orange-600" size={20} />
                <span className="font-semibold text-orange-800">⏱️ Time</span>
              </div>
              <div className="text-3xl font-bold text-orange-700 mb-1">
                {results.processingTime}s
              </div>
              <div className="text-xs text-orange-600">Processing Duration</div>
              <div className="text-xs text-orange-500 mt-1">Simulated timing</div>
            </div>
          </div>
        </div>

        {/* Prediction Analysis */}
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
            🧬 Prediction Analysis
          </h3>
          <p className="text-sm text-green-700 mb-2">
            Generated {results.predictedFrames.length} future frames using simulated conditional diffusion model.
          </p>
          <div className="text-xs text-green-600 space-y-1">
            <p>• 🔄 Temporal coherence maintained across predicted sequences</p>
            <p>• 🌊 Atmospheric dynamics incorporated in motion vectors</p>
            <p>• 📐 Multi-scale feature extraction via UNet architecture</p>
            <p>• 🎯 Noise scheduling optimized for cloud pattern generation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsViewer;
