const { Dog, Temperament } = require('../db');
const router = require('express').Router();
const path = require('path');
const {Storage} = require('@google-cloud/storage');
const GOOGLE_CLOUD_PROJECT_ID = "bestbuds"; // Replace with your project ID
const GOOGLE_CLOUD_KEYFILE = './bestbuds-c58245a2f4d5.json'; // Replace with the path to the downloaded private key
const util = require('util');
const gc = new Storage({
  projectId: GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: GOOGLE_CLOUD_KEYFILE,
})
const bucket = gc.bucket('best-buds');
const uploadImage = (file) => new Promise((resolve, reject) => {
  const { name, data } = file

  const blob = bucket.file(name.replace(/ /g, "_"))
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: file.mimetype
    },
    resumable: false
  })
  blobStream.on('finish', () => {
    const publicUrl = util.format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    )
    resolve(publicUrl)
  })
  .on('error', () => {
    reject(`Unable to upload image, something went wrong`)
  })
  .end(data)
})



router.post('/', async (req, res, next) => {
    try {
        console.log(req.body)
        const file = req.files && req.files.image
        console.log(file)
        
        const imageUrl = file && await uploadImage(file)
        //file && file.mv(path.resolve(`${__dirname}/${file.name}`))
        const { name, height, weight, life_span, temperament } = JSON.parse(req.body.body);
        const dogCreated = await Dog.findOrCreate({
            where: {
              name,
              height,
              weight,
              life_span: life_span || null,
              image: imageUrl || null
            }
          });

        temperament && await dogCreated[0].setTemperaments(temperament);
        res.sendStatus(200);
    } catch (error) {
        next(error);
        res.sendStatus(500);
    }
    
});

module.exports = router;