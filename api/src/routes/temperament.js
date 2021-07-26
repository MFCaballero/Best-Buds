const {getTemperament} = require('../utils/index');
const router = require('express').Router();
module.exports = router;

router.get('/', async (req,res,next) => {
    //encapsulo todo en un try catch para poder manejar los errores y verlos con next(err)
    try {
        let response = await getTemperament();
        res.json(response);

    } catch (error) {
        next(error);
    }
})