import { v2 as cloudinary} from "cloudinary";
import fs from "fs";


(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KAY, 
        api_secret: process.env.CLOUDINARY_API_SECRET// Click 'View API Keys' above to copy your API secret
    });

    const uploadONCloudianry = async (LocalFilePath)=>{
        try{
            if(!LocalFilePath) return null
            //upload file on cloadinary
            const response = await cloudinary.uploader.upload(LocalFilePath,{resource_type: "auto"});
            //file has been uploaded successfully
            console.log("FIle has been uploaded successfully on cloudinary",response.url);
            return response
        }
        catch(error){
            fs.unlinkSync(LocalFilePath)
            return null
        }
    }
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();