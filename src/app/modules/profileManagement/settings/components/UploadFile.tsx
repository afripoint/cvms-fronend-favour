import { useState, ChangeEvent } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

// Define prop types for the component
interface CACUploadProps {
  onUpload: (file: File) => void;
}

const CACUpload: React.FC<CACUploadProps> = ({ onUpload }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      onUpload(file);
      // Reset the file after upload
      setFile(null);
    }
  };

  return (
    <div className="w-full p-2 pt-6 bg-[#F5F7FA] border border-gray-300 rounded-md">
      <div className=" ">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <div className='text-center'>
            <h3 className="text-sm font-bold  text-gray-900">CAC Incorporation Certificate (PDF, JPG, PNG)</h3>
            <p className="text-xs pl-4 text-gray-500 mt-1">Upload a scanned or photographed copy of your CAC Certificate.</p>
          </div>
          <div className="text-gray-400">
            {isExpanded ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
          </div>
        </div>
        
        {isExpanded && (
          <div className=" p-6 rounded-md">
            <div className="flex items-center">
              <div className="mr-4 text-gray-400">
                {/* <FiUploadCloud size={24} /> */}
                <img src="/icons/cloud-upload.svg" alt="" width={50} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-700">Upload your document</p>
                <p className="text-xs text-gray-500">PDF format • Max. 5MB</p>
              </div>
              <button
                onClick={handleUpload}
                className="px-6 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition-colors"
                disabled={!file}
              >
                Upload
              </button>
            </div>
            
            <div className="mt-4">
              <input
                type="file"
                id="cac-document"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
              <label
                htmlFor="cac-document"
                className="block w-full cursor-pointer text-center py-2  hover:bg-gray-50 transition-colors"
              >
                {/* <span className="text-sm text-gray-500">Select a file or drag and drop here</span> */}
              </label>
              {file && (
                <div className="mt-2 text-sm text-gray-600">
                  Selected file: {file.name}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CACUpload;