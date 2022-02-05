const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storageRef = require('../helpers/initStorage');
const APIError = require('../helpers/apiError');

const uploadImage = async (req, res) => {
  try {
    if (!req.file && !req.files)
      throw new APIError(400, 'Please upload an image');

    const uploads = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        const fileExt = path.extname(file.originalname);
        const fileName = `${uuidv4()}${fileExt}`;
        const blob = storageRef.file(fileName);
        const blobStream = blob.createWriteStream({
          resumable: false
        });

        blobStream.on('error', (err) => {
          // res.status(500).json({
          //   success: false,
          //   message: err.message
          // });
          reject({ originalName: file.originalname, err });
        });

        blobStream.on('finish', () => {
          const publicURL = `https://storage.googleapis.com/${storageRef.name}/${blob.name}`;
          resolve({
            originalName: file.originalname,
            newName: fileName,
            url: publicURL
          });
        });
        blobStream.end(file.buffer);
      });
    });

    const info = await Promise.allSettled(uploads);
    const resObj = {
      success: true,
      message: 'Image was successfully uploaded',
      data: info.map((img) => {
        if (img.status === 'fulfilled')
          return {
            image: img.value.originalName,
            newName: img.value.newName,
            url: img.value.url
          };
        return {
          image: img.value.originalName,
          error: img.value.err.message
        };
      })
    };
    res.status(200).json(resObj);
  } catch (err) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message
    });
  }
};

const deleteImage = async (req, res) => {
  try {
    const { name } = req.params;
    if (!name) throw new APIError('No image name provided');

    await storageRef.file(name).delete();
    res.status(200).json({
      success: false,
      message: 'Image was successfully deleted'
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = {
  uploadImage,
  deleteImage
};
