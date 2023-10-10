const userModel = require("../models/userModel");
const factory = require('./handlerFactory');
const multer = require('multer');

exports.postUser = factory.createOne(userModel);
exports.getAllUser = factory.getAll(userModel);
exports.getUser = factory.getOne(userModel);
exports.editUser = factory.updateOne(userModel);
exports.deleteUser = factory.deleteOne(userModel);

//upload file

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/image/users');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    }
});

const multerFilter = (req, file, cb) => {
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.svg)$/i;
    if (allowedExtensions.exec(file.originalname)) {
        cb(null, true);
    } else {
        cb(new AppError('Please upload only jpeg, jpg, png images.', 400), false);
    }
};
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});
exports.uploadUserPhoto = upload.single('Profile_Picture');