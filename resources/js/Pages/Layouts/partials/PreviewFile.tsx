import React, { useEffect } from 'react';

interface FilePreviewProps {
    file: File | string | null;
    onRemoveFile: () => void;
    className?: string;
}

const FilePreview: React.FC<FilePreviewProps> = ({ file, onRemoveFile, className }) => {
    const fileUrl = typeof file === 'string' ? file : file ? URL.createObjectURL(file) : null;
    const fileType = file instanceof File ? file.type : '';

    useEffect(() => {
        // Clean up object URL if a File object is passed
        if (file instanceof File) {
            return () => {
                URL.revokeObjectURL(fileUrl as string);
            };
        }
    }, [file, fileUrl]);

    return (
        <div className={`relative w-20 h-20 flex items-center justify-center ${className}`}>
            <i
                className="ri-close-fill absolute -right-[2px] -top-2.5 text-xl text-gray-700/90 cursor-pointer hover:text-red-500 rounded-full"
                onClick={onRemoveFile}
            ></i>
            <div className="show-media h-14 w-14">
                {fileType.startsWith('image/') ? (
                    <img src={fileUrl!} alt="File preview" className="w-full h-full rounded-md object-cover" />
                ) : fileType.startsWith('video/') ? (
                    <video controls className="w-full h-auto rounded-md">
                        <source src={fileUrl!} type={fileType} />
                        Your browser does not support the video tag.
                    </video>
                ) : file ? (
                    <p className="text-gray-500">Unsupported file type</p>
                ) : null}
            </div>
        </div>
    );
};

export default FilePreview;
