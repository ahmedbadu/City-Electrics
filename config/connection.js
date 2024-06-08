const mongoose = require('mongoose');

async function main(){
    await mongoose.connect('mongodb://localhost:27017/city_electrics');
}

main().then(()=>{
    console.log('Connected successfully');
}).catch(()=>{
    console.log('Failed to connect');
});

module.exports = main;