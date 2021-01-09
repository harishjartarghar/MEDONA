const cloudinary =require('cloudinary');



cloudinary.config({ 
  cloud_name: 'dvibgiyoc', 
  api_key: '913997727116236', 
  api_secret: 'KEokpxyDjfacwh46duH0IQFus6w' 
});


exports.uploadImage = (image) => {
  const cloudinaryOptions = {
    resource_type: 'auto', 
    folder:'medona',
  }
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload_stream(cloudinaryOptions, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    }).end(image.buffer);
  });
};