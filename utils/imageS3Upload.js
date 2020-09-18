"use strict";
const fs = require("fs");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
});

module.exports = function (
  file,
  fileName = new Date().getTime() + ".jpg",
  key
) {
  let Key = "images/" + fileName;
  if (!!key) {
    Key = key;
  }
  const params = {
    Bucket: "vattendonline",
    Key: Key,
    Body: file.file.data,
  };

  return s3.upload(params).promise();
};
