// Assuming your car images are stored in a directory named 'cars'
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const carRoute = express.Router();

carRoute.get('/car-images', (req, res) => {
    const carImagesDir = path.join(__dirname, 'cars');
    fs.readdir(carImagesDir, (err, files) => {
        if (err) {
            console.error('Error reading car images directory:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            // Filter out non-image files if needed
            const imageFiles = files.filter(file => file.endsWith('.jpg') || file.endsWith('.png'));
            const carImages = imageFiles.map(file => `/cars/${file}`);
            res.json(carImages);
        }
    });
});

module.exports = {carRoute};