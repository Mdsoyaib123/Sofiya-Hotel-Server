import catchAsync from "../Utils/catchAsync.js"


const validateRequest = (schema) =>{
    return catchAsync(async (req,res,next)=>{
        await schema.parseAsync(
            req.body
        )
        next()
    })
}

export default validateRequest