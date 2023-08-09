const fs = require('fs');
const axios = require('axios');


const handleOutput = (data, out) => {
    if (out) {
        fs.writeFile(out, data, 'utf8', (err) => {
            if (err) {
                console.log(err);
                process.kill(1);
            }
            console.log('Sucessfully wrote to file.')
        });
    } else {
        console.log(data);
    }
}

const cat = (path, out) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            process.kill(1);
        } else {
            handleOutput(data, out);
        }
    });
}


async function webCat (url, out) {
    try {
        let res = await axios.get(url);
        handleOutput(res.data, out);
    }
    catch (err) {
        console.log(err);
        process.kill(1);
    }
}


let path;
let out;

if (process.argv[2] === '--out') {
    out = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}


if (path.slice(0, 4) === 'http') {
    webCat(path, out);
} else {
    cat(path, out);
}