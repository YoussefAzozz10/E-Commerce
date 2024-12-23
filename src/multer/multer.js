import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import { AppError } from "../utils/AppError.js";



export const fileExtensionsValidation = {
    
    image: ['image/jpeg','image/jpg','image/png','image/gif'],
    file: ['application/pdf','application/docx']

}

function multerRefactor(folderName,validationExtensions){

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, `uploads/${folderName}`);
        },
        filename: function (req, file, cb) {
          cb(null, uuidv4() + "-" + file.originalname);
        }
    });
    
    function fileFilter(req,file,cb){
    
        if(validationExtensions.includes(file.mimetype))
        {
            cb(null,true);
        }
        else
        {
            cb(new AppError("In-Valid file format",400),false);
        }
    
    }
      
    const uploads = multer({ storage , fileFilter });
    return uploads;

}


export const uploadSingleFile = (fileName,folderName,validationExtensions)=> multerRefactor(folderName,validationExtensions).single(fileName);;

const arrayOfImages = [{ name: 'imgCover', maxCount: 1 }, { name: 'images', maxCount: 8 }];

export const uploadCoverFiles = (folderName,validationExtensions)=> multerRefactor(folderName,validationExtensions).fields(arrayOfImages);
