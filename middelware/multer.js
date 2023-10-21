// const express = require('express');
const fs = require('fs')
const multer = require('multer');
const path = require('path');

let randomName;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../upload'));
    },
    // konfigurasi penamaan file yang unik
    filename: function (req, file, cb) {
      console.log(file);
      randomName =  file.fieldname + "-" + Date.now() + path.extname(file.originalname);

      fs.writeFile("file.txt", randomName, (err) => {
        if (err) {console.log(err);}
      })

      cb(
        null, randomName
      );
    },
  });

module.exports = multer({storage : storage});