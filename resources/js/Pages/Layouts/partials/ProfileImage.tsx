// components/ProfileImage.tsx
import React, { useEffect } from 'react';
import { getImageUrl } from '../../../types/getImageUrl';

interface ProfileImageProps {
    image: File | string | null;
    altText?: string;
    className?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ image, altText = "Profile Image", className }) => {
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
            className={className || 'object-cover object-center rounded-full w-full h-full cursor-pointer'}
            src={imageUrl || '/default-profile.png'}  // Fallback to default if no image
            alt={altText}
        />
    );
};

export default ProfileImage;
