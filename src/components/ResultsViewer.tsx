
import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, TrendingUp, Eye } from 'lucide-react';

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
  const [showPredictions, setShowPredictions] = useState(false);

  useEffect(() => {
    if (isPlaying && results) {
      const totalFrames = results.inputImages.length + (showPredictions ? results.predictedFrames.length : 0);
      const interval = setInterval(() => {
        setCurrentFrame(prev => (prev + 1) % totalFrames);
      }, 800);
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
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
        <Eye className="text-green-500" />
        Cloud Motion Prediction Results
      </h2>

      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-lg">
        {/* Image Display */}
        <div className="relative mb-6">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200 max-w-md mx-auto">
            <img
              src={currentImage}
              alt={`Frame ${currentFrame + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
              Frame {currentFrame + 1}/{allFrames.length}
              {isCurrentFramePredicted && (
                <span className="ml-2 bg-green-500 px-1 rounded text-xs">PREDICTED</span>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentFrame(0)}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <SkipBack size={20} />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button
              onClick={() => setCurrentFrame(allFrames.length - 1)}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <SkipForward size={20} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max={allFrames.length - 1}
              value={currentFrame}
              onChange={(e) => setCurrentFrame(parseInt(e.target.value))}
              className="flex-1"
            />
          </div>

          <button
            onClick={() => setShowPredictions(!showPredictions)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              showPredictions
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {showPredictions ? 'Hide Predictions' : 'Show Predictions'}
          </button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-blue-500" size={20} />
              <span className="font-semibold text-gray-700">SSIM</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {results.metrics.ssim.toFixed(3)}
            </div>
            <div className="text-xs text-gray-500">Structural Similarity</div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-green-500" size={20} />
              <span className="font-semibold text-gray-700">MAE</span>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {results.metrics.mae.toFixed(3)}
            </div>
            <div className="text-xs text-gray-500">Mean Absolute Error</div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-purple-500" size={20} />
              <span className="font-semibold text-gray-700">PSNR</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {results.metrics.psnr.toFixed(1)} dB
            </div>
            <div className="text-xs text-gray-500">Peak Signal-to-Noise</div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-orange-500" size={20} />
              <span className="font-semibold text-gray-700">Time</span>
            </div>
            <div className="text-2xl font-bold text-orange-600">
              {results.processingTime}s
            </div>
            <div className="text-xs text-gray-500">Processing Duration</div>
          </div>
        </div>

        {showPredictions && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">Prediction Analysis</h3>
            <p className="text-sm text-green-700">
              Generated {results.predictedFrames.length} future frames using conditional diffusion model. 
              The model incorporates atmospheric dynamics and temporal coherence for realistic cloud motion prediction.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsViewer;
