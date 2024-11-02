#!/usr/bin/env node

const note = process.argv
for(let i = 2;i<note.length;i++){
    const newNote = {
        content:note[i],
        id:Date.now()
    }
    console.log(newNote)
}
