import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const generateHash = (password)=>{
    return crypto.createHmac('sha256','z45@#hgila').update(password).digest('hex')
}

export const generateToken = (user)=>{
    return jwt.sign({_id:user._id,name:user.name,email:user.email,isAdmin:user.isAdmin},
            process.env.TOKEN_SECRET || 'someSecretTest',
            {expiresIn: '30d'}
            
            )
}

export const isAuth = (req,res,next)=>{
    const authorization = req.headers.authorization;
    if(authorization){
        const token = authorization.slice(7,authorization.length); // Bearer XXXXXX
        jwt.verify(token,process.env.TOKEN_SECRET || 'someSecretTest',
        (err,decode)=>{
            if(err){
                err.statusCode = 401;
                err.message = 'Invalid token';
                next(err);
                return;
                //res.status(401).send({message:'Invalid token'})
            }else{
                req.user = decode;
                next();
            }
        })
    }else{
        res.status(401).send({message:'No token'})
    }
}
