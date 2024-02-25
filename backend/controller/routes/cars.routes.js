// Assuming your car images are stored in a directory named 'cars'
const express = require('express');
const app = express();
// const path = require('path');
// const fs = require('fs');
const {carsModel}=require("../../models/carModel");
const carRoute = express.Router();

// carRoute.get('/car-images', (req, res) => {
//     const carImagesDir = path.join(__dirname, 'cars');
//     fs.readdir(carImagesDir, (err, files) => {
//         if (err) {
//             console.error('Error reading car images directory:', err);
//             res.status(500).json({ error: 'Internal server error' });
//         } else {
//             // Filter out non-image files if needed
//             const imageFiles = files.filter(file => file.endsWith('.jpg') || file.endsWith('.png'));
//             const carImages = imageFiles.map(file => `/cars/${file}`);
//             res.json(carImages);
//         }
//     });
// });

carRoute.get("/", async (req, res) => {
    try {
      const cars = await carsModel.find();
      res.status(200).json({ car_data: cars });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  });

module.exports = {carRoute};