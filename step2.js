const fs = require('fs');
const axios = require('axios');

// Step 2
const cat = (path) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            process.kill(1);
        }
        console.log(data);
    });
}
// cat(process.argv[2]);


async function webCat (url) {
    try {
        let res = await axios.get(url);
        console.log(res.data);
    }
    catch (err) {
        console.log(err);
        process.kill(1);
    }
}
// webCat(process.argv[2]);

let path = process.argv[2]
if (path.slice(0, 4) === 'http') {
    webCat(path);
} else {
    cat(path);
}