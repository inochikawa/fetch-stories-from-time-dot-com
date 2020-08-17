const http = require('http');
const fetchStories = require("./fetchStories");

const hostname = "localhost";
const port = 3000;


http.createServer((request, response) => {
    switch (request.url.toLowerCase()) {
        case "/gettimestories":

            fetchStories().then((stories) => console.log(stories));


            response.writeHead(200);
            response.end();

            break;

        default:
            response.writeHead(404);
            response.end();
            break;
    }
}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
