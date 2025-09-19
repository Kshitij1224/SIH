import React, { useRef, useState } from 'react';
import { Upload, FileImage, Brain, Eye } from 'lucide-react';

const MedicalImaging = () => {
  const [dragOver, setDragOver] = useState(false);
  const [selectedCount, setSelectedCount] = useState<number>(0);
  const [selectedExamples, setSelectedExamples] = useState<string[]>([]);
  const folderInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFiles = (files: FileList) => {
    const arr = Array.from(files);
    setSelectedCount(arr.length);
    setSelectedExamples(arr.slice(0, 3).map(f => f.name));
    // TODO: plug these into your analysis/upload pipeline
  };

  const openFolderPicker = () => folderInputRef.current?.click();

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Medical Imaging - Analyse Your Reports</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Area */}
        <div className="lg:col-span-2">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
              dragOver
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
            }`}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Upload Your Medical Scans</h3>
            <p className="text-gray-500 mb-4">
              Drag and drop your X-rays, MRI, CT scans, or click to browse
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button onClick={openFolderPicker} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Choose Files
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">Supports JPG, PNG, DICOM files up to 50MB</p>

            {/* Hidden inputs */}
            <input
              ref={folderInputRef}
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.dcm,image/*"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
              className="hidden"
              {...{ webkitdirectory: 'true', directory: 'true' }}
            />

            {selectedCount > 0 && (
              <div className="mt-4 text-sm text-gray-700">
                Selected {selectedCount} file{selectedCount !== 1 ? 's' : ''}
                {selectedExamples.length > 0 && (
                  <div className="mt-1 text-xs text-gray-500">
                    e.g., {selectedExamples.join(', ')}
                    {selectedCount > selectedExamples.length ? '…' : ''}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* AI Analysis Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">AI Analysis</h3>
              <p className="text-sm text-gray-600">Powered by advanced ML</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">Automated detection</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileImage className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">Instant reporting</span>
            </div>
          </div>
          
          <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            Start Analysis
          </button>
        </div>
      </div>
    </section>
  );
};

export default MedicalImaging;