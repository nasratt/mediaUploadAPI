const express = require('express');

const processFile = require('../middlewares/image.middleware');
const { uploadImage, deleteImage } = require('../controllers/image.controller');

const imageRouter = express.Router();

imageRouter.use(express.urlencoded({ extended: true }));

imageRouter.post('/upload', processFile, uploadImage);
imageRouter.delete('/:name', deleteImage);

module.exports = imageRouter;
