require('dotenv').config();
const { Dog, Temperament } = require('../db');
const axios = require('axios');
const { response } = require('express');
const {YOUR_API_KEY} = process.env;

const getAll = async (name) => {
    //Me traigo la consulta select * de la base de datos, solo los atributos que necesita el front y agrego los temperamentos que los trae del modelo de Temperament con la propiedad include.
    let resultDB = await Dog.findAll({
        attributes: ['id','name', 'image', 'weight'],
        include: [{
            model: Temperament,
            attributes: ['temperament'],
            through: {attributes: []}
        }]
    })
    
    //Me traigo la consulta a la api externa de thedogapi usando el apikey creada y guardada en el archivo .env
    let resultApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`);
    //El resultado de interes se encuentra en la propiedad data de resultApi (cuando se resuelve la promesa). Esta propiedad data es un arreglo que tiene muchos valores por lo que hago un map para traerme solo los valores que necesito en el front
    resultApi = resultApi.data.map(element => element = {
    id: element.id,
    name: element.name,
    image: element.image.url,
    weight: element.weight && element.weight.metric,
    temperaments: element.temperament && element.temperament.split(",").map(e => e = {temperament: e.replace(/ /g, "")})
    });
    console.log(resultApi.length);
    //Concateno los dos arreglos (tanto el resultado de la consulta a la base de datos como el resultado de la peticion a la api externa) en uno solo y devuelvo una copia de ese arreglo con solo los 8 valores iniciales (con el metodo .slice)
    let response = [...resultDB, ...resultApi];
    if(name) response = response.filter(element => element.name.toLowerCase().includes(name.toLowerCase()));//filtro los que matcheen con el query 
 
    return response;
}

const getById = async (idBreed) => {
    //Me traigo de la BD la raza que matchee el id pasado por parametro e incluyo el temperamento
    console.log(idBreed);
    if(isNaN(Number(idBreed))) {
        let resultDB = await Dog.findByPk(idBreed, {
            include: [{
                model: Temperament,
                attributes: ['temperament'],
                through: {attributes: []}
            }],
            attributes: {exclude: ["createdAt", "updatedAt"]}
        });
        return resultDB;
    }else {
        let resultApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`);
        resultApi = resultApi.data.find(element => element.id === parseInt(idBreed));
        resultApi = {
            id: resultApi.id,
            name: resultApi.name,
            height: resultApi.height && resultApi.height.metric,
            weight: resultApi.weight && resultApi.weight.metric,
            life_span: resultApi.life_span,
            image: resultApi.image.url,
            temperaments: resultApi.temperament && resultApi.temperament.split(",").map(e => e = {temperament: e})
        }
        return resultApi;
    }
}

const getTemperament = async () => {
    let result = await Temperament.findAll({
        attributes: ['id','temperament'],
        order: [['temperament', 'ASC']]
    });
    if(result. length > 0){
        console.log("entre a DB");
        return result;
    }else {
        console.log("entre al if")
        let resultApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`);
        let tempApi = resultApi.data.map(element => element = element.temperament);
        tempApi = tempApi.flat().join().split(",")
        tempApi = tempApi.map(element => element = element.replace(/ /g, ""))
        tempApi = tempApi.filter((value, index, self) => self.indexOf(value) === index);
        tempApi = tempApi.filter(element => element !== "").map(element => element = {temperament: element});
        await Temperament.bulkCreate(tempApi);
        result = await Temperament.findAll({
            attributes: ['id','temperament'],
            order: [['temperament', 'ASC']]
        });
        return result;
    }
}

module.exports = {
    getAll,
    getById,
    getTemperament
};