export const ControllerAccessCheck = (req, res,module,action ) =>{
    let responseMessage = "User not Authorised to perforn this action"
    if (req.user.userAccess.hasOwnProperty(module)){
        let moduleAccess = req.user.userAccess[module];
        if (moduleAccess?.[action] == true){
            return true
        }
        else{
            res.status(401).json({message:responseMessage})
        }
    }
    else{
        res.status(401).json({message:responseMessage})
    }
    return false
}


export function CheckAccessController(req, res, module, action, next) {
        let responseMessage = "User not Authorised to perforn this action"
        if (req.user.userAccess.hasOwnProperty(module)){
            let moduleAccess = req.user.userAccess[module];
            if (moduleAccess?.[action] == true){
                next();
            }
            else{
                return res.status(401).send({message:responseMessage})
            }
        }
        else{
            return res.status(401).send({message:responseMessage})
        }
}
