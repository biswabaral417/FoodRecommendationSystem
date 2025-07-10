import React, { useState, useId } from 'react';
import type { ChangeEvent } from 'react';

type FileInputProps = {
  onFileSelect: (file: File | null) => void;
  label?: string;
};

const FileInput: React.FC<FileInputProps> = ({ onFileSelect, label }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const inputId = useId(); // Generates a unique ID for accessibility

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileName(file?.name || null);
    onFileSelect(file);
  };

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={inputId} className="block mb-1 font-semibold text-sm text-gray-700">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
      />
      {fileName && (
        <p className="mt-2 text-sm text-gray-500">Selected file: <strong>{fileName}</strong></p>
      )}
    </div>
  );
};

export default FileInput;
