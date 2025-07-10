import cloudinary from "./cloudinary";
import streamifier from "streamifier";

const uploadImageToCloud = async (image: Express.Multer.File): Promise<string | null> => {
    try {
        if (!image) return null;

        const uploadStream = () => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'profile_images' },
                    (error, result) => {
                        if (result) resolve(result.secure_url);
                        else reject(error);
                    }
                );
                streamifier.createReadStream(image.buffer).pipe(stream);
            });
        };

        const imageUrl = await uploadStream() as string;
        return imageUrl;

    } catch (error) {
        console.error('Error uploading image to cloud:', error);
        throw new Error('Failed to upload image');
    }
};

export default uploadImageToCloud;
