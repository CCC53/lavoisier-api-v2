import { Provider } from "@nestjs/common";
import { v2 as cloudinary } from 'cloudinary';

export const UploadProvider: Provider = {
    provide: `${process.env.CLOUD_PROVIDER}`,
    useFactory: () => {
        return cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_API_SECRET,
            secure: true
        });
    }
}