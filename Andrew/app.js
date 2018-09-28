console.log('hello from app store')

const fs = require('fs'),
      os = require('os'),
      notes = require('./notes.js'),
      _= require('lodash'),
      yargs = require('yargs')
			// user = os.userInfo(); 
	// REQUIRE EXTERNAL FILES I CREATED		
// let res = notes.addNote();
// console.log(res)

// let result = notes.add(9,-7)
// console.log(result)

// USING FS.APPENDFILE
// fs.appendFile('greetings.txt',`hello ${user.username}`, function(err) {
//     if(err) {
//         console.log('Unable to write to file');
//     }
// });

// fs.appendFileSync('greetings.txt', 'hello-world'); 

// USING LODASH
// console.log(_.isString(true))
// console.log(_.isString('Chidera'))
// let filteredArray = [1,2,3,4,52, 1,2,3,567]
// console.log(filteredArray)

// GETTING INPUTS FROM USER

const argv = yargs.argv;
let command = argv._[0];
console.log('command: ', command);
console.log('Process ', process.argv);
console.log('yargs ', argv)

if(command ==='list') {
  notes.getAll()
}
else if(command ==='add') {
 let note = notes.addNote(argv.title,argv.body)
 if(note) {
   console.log('Note created');
   notes.logNote(note)
 }else {
   console.log('Note title taken')
 }
}
else if(command ==='read') {
  let note = notes.getNote(argv.title);
  if(note) {
    console.log('Note found');
    notes.logNote(note)
  }else {
    console.log('Note not found');
  }
}
else if(command ==='remove') {
  let noteRemoved = notes.removeNote(argv.title),
  message = noteRemoved ? 'Note was removed' : 'Note was not removed ';
  console.log(message)
}
else{
  console.log('does not exist')
}