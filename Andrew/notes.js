console.log('hello from notes app');
const fs = require('fs')

let fetchNotes = () => {
	try {
		let noteString = fs.readFileSync('notes-data.json');
		return JSON.parse(noteString);
	} catch (e) {
		return [];
	}
}

let saveNotes = (notes) => {
	fs.writeFileSync('notes-data.json', JSON.stringify(notes))
}

const addNote = (title, body) => {
	let notes = fetchNotes();
	let note = {
		title,
		body
	};


	//CHECK FOR DUPLICATES
	let duplicateNotes = notes.filter((note) => note.title === title)

	//PUSH TO NOTES    
	if (duplicateNotes.length === 0) {
		notes.push(note)
		// SAVE TO FILE SYSTEM
		saveNotes(notes);	
		return note	
	}
}

const getAll = () => {
	console.log('getting all notes')
}

const getNote = (title) => {
	let notes = fetchNotes();
	let filteredNotes = notes.filter((note) => note.title === title);
	return filteredNotes[0];
}

const removeNote = (title) => {
	let notes = fetchNotes();
	filteredNotes = notes.filter((note) => note.title !== title)
	saveNotes(filteredNotes)
	return notes.length !== filteredNotes.length
}

let logNote = (note) => {
	console.log('--');
	console.log(`Title: ${note.title};`);
	console.log(`Body: ${note.body}`)
}
module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote,
	logNote
};

































// console.log('hello from notes app');
// const fs = require('fs')

// const addNote = (title,body) => {

//     let notes = [];
//     //CREATE VARIABLE NOTE
//     let note = {
//         title, 
//         body
//     };

//     //FETCH EXISTING NOTE
// try {
//     let noteString = fs.readFileSync('notes-data.json');
//     notes = JSON.parse(noteString);
// }catch(e) {

// }
// //CHECK FOR DUPLICATES
//     let duplicateNotes = notes.filter((note) => note.title === title)

//     //PUSH TO NOTES    
//     if(duplicateNotes.length === 0) {
//     notes.push(note)
//     // SAVE TO FILE SYSTEM
//     fs.writeFileSync('notes-data.json', JSON.stringify(notes))
//     }

// }