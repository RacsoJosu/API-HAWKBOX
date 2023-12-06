const multer = require('multer');

const fileFilter = (req, file, cb) => {
 
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
  
    req.messagge = "El archivo es válido";
    cb(null, true);
  } else {

    req.messagge = "El archivo no es válido";
    cb(null, false);
  }
};
const storage = multer.diskStorage({
  destination: function(req, filename, cb) {
    const pathStorage = `public/images`
    cb(null, pathStorage)
  },
  filename: function(req, filename, cb) {
    
      const ext = filename.originalname.split(".").pop();
      const File = `file-${req.body.idUsuario}-${Date.now()}.${ext}`;
      cb(null, File)
        
     
  }
});

const upload = multer({ storage: storage, fileFilter:fileFilter });

module.exports = upload;