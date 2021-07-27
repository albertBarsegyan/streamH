const fs = require('fs');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));
const gzip = require('zlib')
const pathFromConsole = argv._[0]
const dirname = path.dirname(pathFromConsole);
const secondFolder = './secondFolder';



fs.access(secondFolder, function(error) {
    if (error) {
        fs.mkdir(path.join(dirname, secondFolder), (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('Directory created successfully!');
        });


        fs.readdir('./folder', (err, f) => {
            if (err) {
                console.error(err)
            }
            f.forEach(fileName => {
                const fileContents = fs.createReadStream(`./folder/${fileName}`);
                const writeStream = fs.createWriteStream(`${secondFolder}/${fileName.slice(0, -3)}.gzip`);
                fileContents.pipe(gzip.createGzip()).pipe(writeStream);
            })
        })
    } else {
        console.log("Directory exists.")
    }
})