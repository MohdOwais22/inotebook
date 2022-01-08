const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'

const connectToMongo = ()=>{
    mongoose.connect(mongoUri).then(()=>{
          console.log('connected to mongoose')
            }).catch((err)=>{
               console.log(err);
  })
}

module.exports = connectToMongo;
