const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/playground', { useNewUrlParser: true })
  .then(()=> console.log('connected to mongo database '))
  .catch(err => console.log('could not connect to Mongodb', err))
  //schema is used to define the shape of documents in a  mongodb collection.


  // CRUD OPERATION

  const courseSchema = new mongoose.Schema({  
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now},
    isPublished: Boolean
  })

  //Imagine that we have a class Human and an object John, so an object is an instance of a class while a class is a blueprint.
//We want ot have a class Course and then we want to have instances of that class say node course and we want to save that node course to our database.

// mongoose.model takes two parameters. The first one is the singular name of the collection that this model is for, the second is the schema that defines the shape of documents in this collection.

const Course = mongoose.model('Course', courseSchema)
//lets create an object based of the Course class




//Here we are dealing with an asynchronous operation because its going to take sometime to save the course in the daata base because we are going to access the file system thats y we are dealing with an asynchronous operation .The result of this operation will be ready in the future so this method returns a promise, wwe can await it andd get the result. The result is the actual course object that . 
//When we save it to mongodb , mongodb will attach a unique id to the course object.

//When using await, your code should be inside an async function



//USING ASYNC FUNCTION
async function createCourse() {
  const course = new Course({  
    name: 'Udemy  course',
    author: 'Paul Chris',
    tags: ['udemy', 'fullstack'],
    isPublished: true
  });
 
const result=await course.save();
console.log(result);
}

createCourse()

// USING >THEN
// const course = new Course({
//   name: 'Nodejs course',
//   author: 'Chidera Paul',
//   tags: ['node', 'backend'],
//   isPublished: true
// });

// course.save()
//   .then(res => console.log(res))
//   .catch(err => console.log('Sorry the database could not be saved', err));


  //Querry Documents retrieving documents from mongodb database
//we can pass filters

// Course.find({
//   author: 'Mosh', isPublished: true
// })
//   .limit(10)
//   .sort({ name: 1 })
//   .select({ name: 1, tags: 1 })
//   .then(res => console.log(res))
//   .catch(err => console.log('Could not find data base', err));



  //building querries 
  //comparison operators include eq, ne, gt, gte, lt, lte
  // Course.find({
  //   price: { $gte: 10, $lte: 20, $in: [10,15,20] }
  // })
  //   .limit(10)
  //   .sort({ name: 1 })
  //   .select({ name: 1, tags: 1 })
  //   .then(res => console.log(res))
  //   .catch(err => console.log('Could not find data base', err));

 // Logical operators include: or and
  // Course.find()
  //   .or([{ author: 'Chidera Paul' },{isPublished: true}])
  //   .and([  ])
  //   .limit(10)
  //   .sort({ name: 1 })
  //   .select({ name: 1, tags: 1 })
  //   .then(res => console.log(res))
  //   .catch(err => console.log('Could not find data base', err));

  //REGULAR EXPRESSIONS
//   Course.
//   //starts with Mosh
//   find({
//     author:  /^Mosh /, isPublished: true
//   })
//   //ends with Mosh
//   .find({
//     author:  /Paul $/i, isPublished: true
//   })
//   //contains Mosh
// .find({ author:  /.*Paul .*/i, isPublished: true  })
//   .or([{ author: 'Chidera Paul ' },{isPublished: true}])
//   .and([{ author: 'Chidera Paul ' },{isPublished: true}])
//   .limit(10)
//   .sort({ name: 1 })
//   .select({ name: 1, tags: 1 })
//   .then(res => console.log(res))
//   .catch(err => console.log('Could not find data base', err));

//COUNTING
// Course.find({
//   author: 'Mosh ', isPublished: true
// })
//   .limit(10)
//   .sort({ name: 1 })
//   .select({ name: 1, tags: 1 })
//   .count()
//   .then(res => console.log(res))
//   .catch(err => console.log('Could not find data base', err));


  //PAGINATION, Skip
  // const 
  //  pageNumber = 2,
  //  pageSize = 20;
  // Course.find({
  //   author: 'Mosh ', isPublished: true
  // })

  //   .skip((pageNumber - 1)* pageSize)
  //   .limit(10)
  //   .sort({ name: 1 })
  //   .select({ name: 1, tags: 1 })
  //   .count()
  //   .then(res => console.log(res))
  //   .catch(err => console.log('Could not find data base', err));

//UPDATING 
//There are two ways to update a document,.
// First is the Query first method: you find the document by id, modify its properties and finally save it.

// Second is using the Update first where you go directly to the data base and update, you can optionally get the updated document

// Course.find({
//   author: 'Mosh ', isPublished: true
// })
//   .limit(10)
//   .sort({ name: 1 })
//   .select({ name: 1, tags: 1 })
//   .then(res => console.log(res))
//   .catch(err => console.log('Could not find data base', err));

//  using the first method : Query first, useful especially when receiving input from the user.
// async function updateCourse (id) {
//   const course = await Course.findById(id);
//   if (!course) return;

//   //first approach
//   // course.isPublished = true;
//   // course.author = 'Another Author'

//   course.set({
//     isPublished: true,
//     author: 'Another Author'
//   })

//   const result = await course.save();
//   console.log(result);
// }

//  updateCourse('5b9637c13e387f14fce82ab0');


//SECOND METHOD:  Update first , USEFUL WHENYOU ARE NOT RECEIVING ANYTHING FROM THE USER AND YOU WANT TO UPDATE DOCUMENT(S) DIRECTLY FROM THE DATABASE:


// async function updateCourse (id) {
  /*the .update method takes two arguments, the first is the query, the second is the update object where we need to use one or more of the mongodb update operators.*/

  /* mongodb.com/manual/reference/operator/update*/
  //   const result = await Course.updateOne({ _id: id }, {
  //     $set: {
  //       author: 'Chidera Paul',
  //       isPublished: false,
  //       name: 'ES6 course'
  //     }
  //   });
  //   console.log(result);
  // }
  
  // updateCourse('5b9186cb9d7a131b30267a80');

  //SOMETIMES YOU WANT TO GET THE DOCUMENT THAT WAS UPDATED; USE THIS
//   async function updateCourse(id) {
//     const course = await Course.findByIdAndUpdate(id, {
//       $set: {
//         author: 'Jack',
//         isPublished: false
//       }
//     },{new: true});
//     console.log(course)
//   }
//  updateCourse('5b9637c13e387f14fce82ab0')
  //DELETE 

  //DELETING ONE
// async function removeCourse (id) {
//   const result = await Course.deleteOne({ _id: id });
//   console.log(result)
// }

// removeCourse('5b9239977fa0030df8427a8f');

//DELETING MANY
// async function removeCourse (id) {
//   const result = await Course.deleteMany({ _id: id });
//   console.log(result)
// }
// removeCourse('5b8e92b69871db1ded455389');

//VALIDATION