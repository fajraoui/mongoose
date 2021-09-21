const mongoose = require("mongoose");
//create person schema
const personSchema = new mongoose.Schema({
    id:{
        type:Number,
         unique:true
        },
    
    name :{ 
         type: String,
        required: true,
        default: 'Adam'
    },
    
    age:{
            type: Number,
            default: 33
        },
    favoriteFoods: {
            type: [String],
          },
});
//create  model
const person = mongoose.model("person", personSchema);

module.exports = person;

