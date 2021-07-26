const {getAll, getById} = require('../utils/index');
const router = require('express').Router();


router.get('/', async (req,res,next) => {
    //encapsulo todo en un try catch para poder manejar los errores y verlos con next(err)
    try {
        let name = req.query.name;// me devuleve un array con las dos respuestas la de la base de datos y la de la api
        let response = await getAll(name);
        if(name) {
            if(response.length === 0){
                return res.status(404).json(new Error("Breed not found"));// si no matchea envia un error
            }
        }

        return res.json(response);

    } catch (error) {
        next(error);
    }
})

router.get('/:idRaza', async (req,res,next) => {
    try {
        let idRaza = req.params.idRaza;
        let response = await getById(idRaza);
        if(response) {
            return res.json(response);
        }
        return res.sendStatus(404);

    } catch (error) {
        next(error);
    }
})





module.exports = router;