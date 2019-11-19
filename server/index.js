const child_process = require('child_process');
const fs = require('fs');

const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json({limit: '50mb'}));

const port = 3000;

async function evaluate() {

    console.log("spawning python process");
    // const options = {stdio: [process.stdin, process.stdout, process.stderr]};
    const options = {};
    const filepath = 'E:/projects/trash_server/crossdit/test.py';
    child_process.spawnSync('python',[filepath], options);
    console.log("process ended");
    
    let result = fs.readFileSync('result.json', 'utf-8');
    console.log(result);

}


app.get('/', (request, response ) => {
    response.send("the route you are looking for is /pic");
    evaluate();
});

app.post('/pic', async (request, response) => {
    base64Data = request.body.equipment_image.imagebase64;
    binaryData = Buffer.from(base64Data, 'base64');

    fs.writeFileSync('image.jpeg', binaryData, 'binary');
    await evaluate();
    fs.readFile('result.json', 'utf-8', (err, data) => {
        console.log(data);
        response.send(data);
    });
});

app.listen(port, () => console.log("Listening on 3000"));