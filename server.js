const express=require("express")
const connectMongoDb = require("./connect/connectMongoDb");
require("dotenv").config({ path: "./connect/.env" });
const personData = require("./data");
const person = require("./model/personModel");

const app = express();
port = process.env.PORT ||5000;
//Installing and setting up Mongoose....
// check the file in ./connect/connectMongoDb.js

connectMongoDb();

//Create a person prototype....
//check the file in ./model/personModel.js
//Create and Save a Record of a Model..............
const personR = new person({

        id:6,
        name: 'Aria',
        age:28,
        favoriteFoods:['ravioli','focaccia','tiramisu'],
  });
  personR.save((err) => {
    err ? console.log('Error', err) : console.log('new person inserted succesfully')
   })
  //Create Many Records with model.create()...........

   person.create([
        {
            id:9,
            name: 'Carina',
            age:27,
            favoriteFoods:['fritto misto']  
        },
        {
            id:8,
            name: 'Elma',
            age:32,
            favoriteFoods:['acciuga']  
        },
        {
            id:7,
            name: 'Sarah',
            age:34,
            favoriteFoods:['dolci']  
        },
      ])
      .then(console.log('Multiple records added succesfully'))
      .catch((err) => console.log('error'))
 //Use model.find() to Search Your Database .....

person.find({ name: "Andrea" }, function (err, res) {
    err ? console.log('Error', err) : console.log(res)
})
      
  //Use model.findOne() to Return a Single Matching Document from Your Database....

 person.findOne({ name: "Elena" }),function(err,res){
    err ? console.log('Error', err) : console.log(res)
}
     
  //Use model.findById() to Search Your Database By _id......
  let personId = 3
   person.findById( personId, function(err, res) {
      err ? console.log('Error', err) : console.log(res)
  })
  //Perform Classic Updates by Running Find, Edit, then Save.........
let PersonId=1
person.findOne(PersonId).then((res) => {
    console.log(res)
 res.favoriteFoods.push('Hamburger')
console.log('your favouriteFoods is updated succesfully')
     res.save()
     })
     .catch((err) => console.log(err))
  //Perform New Updates on a Document Using model.findOneAndUpdate()..........

person.findOneAndUpdate(
        { name: "Elena" },
        { $set: { age: 20 } },
        { new: true }
      );
    
  //Delete One Document Using model.findByIdAndRemove....
person.findByIdAndRemove({
        id: 1,
      },(err) => {
        err ? console.log('Error', err) : console.log('Person removed')
         })
      
  //MongoDB and Mongoose - Delete Many Documents with model.remove()............
person.remove({ name: "Mary" }, function (err, res) {
        if (err) console.log(err);
        else console.log("all person called Mary are removed");
      });
  //Chain Search Query Helpers to Narrow Search Results.......
    person
        .find({ favoriteFoods: "burritos" })
        .sort({ name: 1 })
        .limit(2)
        .select({ age:0 })
        .exec((err, data) =>
        err
          ? console.error( err)
          : console.log('people whos favoriteFood is burritos:', data)
      );
        

//Creation of a listener for the app.........
app.listen(port, (err) => err? console.log("failed to run the server"):console.log(`server running on port ${port}!`))

