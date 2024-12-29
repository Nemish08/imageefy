import React, { useState } from 'react';
import { ImageIcon, SparklesIcon, RefreshCcwIcon } from 'lucide-react';

const Home = () => {
    const [prompt, setPrompt] = useState('');
    const [src, setSrc] = useState('')
    const [generatedImage, setGeneratedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [flag, setFlag] = useState(false)
  
    const handleGenerate = async () => {
      if (!prompt.trim()) return;
    
      setSrc(`${import.meta.env.VITE_API_KEY}/${prompt.replace(' ', '+').trim()}`)
      setFlag(true)
      setPrompt('')


    
    //   setIsLoading(true);
    //   try {
    //     // Simulated image generation (replace with actual API call)
    //     const response = await fetch('https://api.example.com/generate-image', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ prompt })
    //     });
  
    //     const data = await response.json();
    //     setGeneratedImage(data.imageUrl);
    //   } catch (error) {
    //     console.error('Image generation failed:', error);
    //     alert('Failed to generate image');
    //   } finally {
    //     setIsLoading(false);
    //   }
    };
  
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
          <div className="p-6 bg-gray-800">
            <h1 className="text-2xl font-bold mb-4 flex items-center">
              <SparklesIcon className="mr-2 text-purple-400" />
              AI Image Generator
            </h1>
  
            <div className="flex space-x-2 mb-4">
              <div className="flex-grow relative">
                <input 
                  type="text" 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the image you want to generate..."
                  className="w-full p-3 pr-10 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <ImageIcon 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                />
              </div>
              <button 
                onClick={handleGenerate}
                disabled={isLoading || !prompt.trim()}
                className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg transition-colors 
                           disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <RefreshCcwIcon className="mr-2 animate-spin" />
                    Generating...
                  </div>
                ) : (
                  'Generate'
                )}
              </button>
            </div>
  
            {generatedImage && (
              <div className="mt-4 rounded-lg overflow-hidden shadow-lg border border-gray-700">
                <img 
                  src={generatedImage} 
                  alt="Generated AI Artwork" 
                  className="w-full h-96 object-cover"
                />
                <div className="p-3 bg-gray-700 text-sm text-gray-300 flex justify-between items-center">
                  <span>AI Generated Image</span>
                  <button 
                    onClick={() => setGeneratedImage(null)}
                    className="text-red-400 hover:text-red-500 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
  
            {!generatedImage && (
              <div className="mt-4 p-4 bg-gray-700 rounded-lg text-center text-gray-400">
                {flag && <img className="object-cover" src={src}></img>}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default Home;