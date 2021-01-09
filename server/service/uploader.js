const multer =require('multer');

const upload = multer();

exports.parseImageUpload = (req, res) => {
  return upload.single('image');
};