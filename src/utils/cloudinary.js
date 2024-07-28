import {v2 as cloudinary} from "cloudinary"

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        // user uploaded some missing/wrong file
        if(!localFilePath) return null;

        const response = await cloudinary.uploader.upload(
            localFilePath, {
                resource_type: "auto"
            }
        );
        // File uploaded successfully
        console.log("File uploaded successfully", response.url);

        return response;

    }
    catch (error) {
        // cloudinary upload failed but file got stored in server
        // remove/unlink the locally saved file
        fs.unlinkSync(localFilePath);
        return null;
    }
}


export { uploadOnCloudinary }