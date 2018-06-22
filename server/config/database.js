const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydatabase',(err)=>{
    !err ? console.log("Mongodb connected") : console.log(err);
});

module.exports = mongoose;