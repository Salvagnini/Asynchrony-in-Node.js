import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import { createRequire } from 'node:module';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);
const PORT = process.env.PORT || 3000;
const app = express();

if(process.env.NODE_ENV === 'development') {
    console.log('development mode');
} else {
    console.log('production mode');
}

// app.get('/', (req, res)=>{
    // res.send('<h1>Wellcome</h1>');
// })
// npm start
// npm run dev

// ****************************   3   ***********************
// app.get('/', function(req, res) {
//   fs.readFile(path.join(__dirname, './package.json'), (err, content) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Internal Server Error');
//     } else {
//       res.write('<h1>Welcome</h1>');
//       res.write('<h1>JSON text:</h1>');
//       res.write(content);
//       res.end();
//     }
//   });
// });


// ****************************  4  ********************


const util = require('util');
const readFile = util.promisify(fs.readFile);

app.get('/', async (req, res) => {
  try {
    const content = await readFile(path.join(__dirname, './package.json'));
    res.write('<h1>Welcome</h1>');
    res.write('<h1>JSON text:</h1>');
    res.write(content);
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, ()=> {
    console.log(`Server started on http://localhost:${PORT}`);
})

















// app.get('/', async (req, res) => {
//   try {
//     const content = await readFile(path.join(__dirname, './package.json'));
//     const data = JSON.parse(content);
//     res.write('<h1>Welcome</h1>');
//     res.write('<h1>JSON text:</h1>');
//     res.write(`<p>Name: ${data.name}</p>`);
//     res.write(`<p>Version: ${data.version}</p>`);
//     res.write(`<p>Description: ${data.description}</p>`);
//     res.write(`<p>Author: ${data.author}</p>`);
//     res.end();
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Internal Server Error');
//   }
// });