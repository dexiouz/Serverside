

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/validation',{ useNewUrlParser: true })
  .then(()=> console.log('connected to mongo database '))
  .catch(err => console.log('could not connect to Mongodb', err))
  //schema is used to define the shape of documents in a  mongodb collection.


  // CRUD OPERATION
// create schema with the name courseSchema
  const courseSchema = new mongoose.Schema({ 
    //using required ensures that the field must be provided.q 
    name: {
      // specific validators for strings
      type: String, 
      required: true,
      minlength: 5,
      maxlength: 255,
      // match: /pattern/,
      // enum: ['web','development']
    },
    category: {
      type: String,
      required: true,
      enum: ['web', 'mobile', 'network'],
      //OTHER SCHEMA TYPE PROPERTIES
      lowercase: true,
      trim: true
    },
    author: String,
    tags: {
      type: Array,
      // async VALIDATORS
      validate: {
        isAsync: true,
        validator: function(v, callback) {
          setTimeout(() => {
            //DO some async work
            const result = v && v.length > 0;
            callback(result);
          }, 4000)
        }
      }
    //   // CUSTOM VALIDATORS
    //   validate: {
    //     validator: function(v) {
    //       return v && v.length > 0;
    //     },
    //     message: 'A course should have atleast one tag'
    //   }
     },
    date: { type: Date, default: Date.now},
    isPublished: Boolean,
    price: {
      // specific validors for number
      type: Number,
      required: function() {
        return this.isPublished
      },
      min: 10,
      max: 200,
      //OTHER SCHEMA TYPES IRRESPECTIVE
      get: v => Math.round(v),
      set: v => Math.round(v)
    }
  })

//   create model of the Schema, let the model's name be Course; Course will be a class, a template
  const Course = mongoose.model('Course', courseSchema);
// //Create an instance of the Course, say a node course
// //
// async function createCourse() {
//   const course = new Course({
//     // name: 'validation course',
//     author: 'chidera  and Mosh',
//     tags: ['node', 'frontend', 'backend'],
//     isPublished: true
//   });
//   // save the node course
//   try {
//     //use built in validation
//     await course.validate()
//     // const result = await course.save();
//     // console.log(result);
//   } catch (ex) {
//     console.log(ex.message)
//   }
// }
// createCourse()

// //BUILT IN VALIDATORS
// //error if category match is wrong and if isPublished is true and there is no price
// async function createCourse() {
//   const course = new Course({
//     name: 'validation course',

  //   cate gory: '-',
  //   author: 'chidera  and Mosh',
  //   tags: ['node', 'frontend', 'backend'],
  //   isPublished: true,
  //   price: 18
  // });
  // // save the node course
  // try {
//     //use built in validation
//     await course.validate()
//     // const result = await course.save();
//     // console.log(result);
//   } catch (ex) {
//     console.log(ex.message)
//   }
// }
// createCourse()

//CUSTOM VALIDATORS 
// SUPPOSE WE WANT TO DEFINE THAT EVERY COURSE SHOULD HAVE ATLEAST ONE TAG. CHECK SCHEMA FOR TAGS

// create course
async function createCourse() {
  const course = new Course({
    name: 'validation course',

    category: 'Web',
    author: 'chidera  and Mosh',
    tags: ['frontend'],
    isPublished: true,
    price: 18.78
  });
  // save the node course
  try {
    const result = await course.save();
     console.log(result);
  } catch (ex) {
    //validation errors
    for (field in ex.errors) {
      console.log(ex.errors[field].message)
    }
  }
}
createCourse()

async function getCourse() {
  const 
   pageNumber = 2,
   pageSize = 10;
  
   const courses = await Course
     .find({
      _id: '5b991be355617c16a41238d6'
     })
    // .skip((pageNumber - 1)* pageSize)
    // .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1,price: 1 })
    console.log(courses[0].price);
}
// getCourse()


//ASYNC VALIDATORS
// Sometimes the validation logic may involve reading something from the data base or a remote http Server. So we dont have the answer straight away. In that case wwe need an async validator. here we see how to convert a synchronous validator to an asynchronous onemptied.

