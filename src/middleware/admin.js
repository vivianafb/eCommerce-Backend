const admin = true;
const user = true;

export const checkAdmin = (req,res,next) => {
    if(admin) next();
    else{
        res.status(401).json({
            error: -1,
            descripcion: `Ruta: ${req.url}`,
            metodo: `${req.method} no autorizada`
        })
    }
}
export const checkUsuario = (req,res,next) => {
    if(user)
    next();
    else{
        res.status(401).json({
            error: -1,
            descripcion: `Ruta: ${req.url}`,
            metodo: `${req.method} no autorizada`
        })
    }
}