export const getImageUrl = (image: File | string | null): string | undefined => {
    if (!image) {
        return undefined;
    }
    if (image instanceof File) {
        return URL.createObjectURL(image);
    }
    return image;
};
