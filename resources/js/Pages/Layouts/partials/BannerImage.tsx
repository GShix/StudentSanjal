// components/BannerImage.tsx
import React, { useEffect } from 'react';
import { getImageUrl } from '../../../types/getImageUrl';

interface BannerImageProps {
    image: File | string | null;
    altText?: string;
    className?: string;
}

const BannerImage: React.FC<BannerImageProps> = ({ image, altText = "Banner Image", className }) => {
    const imageUrl = getImageUrl(image);

    useEffect(() => {
        // Clean up object URL if a File object is passed
        if (image instanceof File) {
            return () => {
                URL.revokeObjectURL(imageUrl as string);
            };
        }
    }, [image, imageUrl]);

    return (
        <img
            className={className || 'object-center w-full h-full cursor-pointer'}
            src={imageUrl || '/default-profile.png'}  // Fallback to default if no image
            alt={altText}
        />
    );
};

export default BannerImage;
