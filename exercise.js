const fs = require('fs');

const content = 'This is the content of exercise.txt!';
const filePath = 'exercise.txt';

fs.writeFile(filePath, content, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log("File written succesfully");
  }
});