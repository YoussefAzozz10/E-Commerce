import slugify from "slugify";
import { catchError } from "../../utils/ErrorHandling.js";
import { AppError } from "../../utils/AppError.js";
import { APIFeatures } from "../../utils/APIFeatures.js";



export const deleteOne = (model,name)=>{

    return catchError(async (req,res,next)=>{

        const {id} = req.params;
    
        const findItem = await model.findByIdAndDelete({_id:id});
    
        !findItem && next(new AppError(`${name} does not found`,404));

        let response={};
        response[name] = findItem;

        findItem && res.status(200).json({message:"Done",...response});
    
    });

};

export const updateOne = (model,name)=>{

    return catchError(async (req,res,next)=>{

        const {id} = req.params;
        const {category} = req.body;
    
        if(req.body.name){
            req.body.slug = slugify(req.body.name);
            const findItem = await model.findByIdAndUpdate({_id:id},{name:req.body.name,slug:req.body.slug,category:category},{new:true});
            !findItem && next(new AppError(`${name} does not found`,404))
            findItem && res.status(200).json({message:"Done",findItem})
        }
        else
        {
            const findItem = await model.findByIdAndUpdate({_id:id},{category:category},{new:true});
            !findItem && next(new AppError(`${name} does not found`,404))
            findItem && res.status(200).json({message:"Done",findItem})
        }    
    });

};





export const getAllItems = (model)=>{


    return catchError(async (req,res,next)=>{

        const mongooseQuery = model.find();

        let apiFeatuers = new APIFeatures(mongooseQuery,req.query).paginate().filter().sort().search().selectedFields();
        
        //Query Execution
        const nameItems = await apiFeatuers.mongooseQuery;
        
        !nameItems.length && res.status(200).json({message:"No items found",nameItems});
        nameItems.length && res.status(200).json({message:"Done",nameItems});
    
    });

};


export const getSpecificItem = (model,name)=>{

    return catchError(async (req,res,next)=>{

        const {id} = req.params;

        const getSpecificItem = await model.findById({_id:id});

        !getSpecificItem && next(new AppError(`${name} id not found`,404));
        getSpecificItem && res.status(200).json({message:"Done",getSpecificItem});

    })

};


export const addItem = (model,itemName)=>{

    return catchError(async (req,res,next)=>{
        
        const findItem = await model.findOne({name:req.body.name});
        if(findItem)
            return next(new AppError(`${itemName} already exists`,409));
        
        req.body.slug="asder";
        req.body.image = req.file.filename;
        
        const item = await model.create(req.body);
    
        return res.status(201).json({message:"Done",item});
    
    });

};
