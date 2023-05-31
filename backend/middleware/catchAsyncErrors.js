module.exports  = (theFunc)  =>(req, res, next)=>{
    Promise.resolve(theFunc(req,res, next)).catch(next)
}


//thsi is nothign but a try catch block in another way