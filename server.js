const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const hubsRouter = require('./hubs/hubs-router.js');
const gate = require('./auth/gate-middleware.js');
const server = express();

// middleware
function logger(req, res, next) {
console.log(`${req.method} to ${req.path}`);
 
next();
}


// setup global middleware
server.use(logger);
server.use(helmet());
server.use(express.json());

server.get('/free', (req,res) => {
  res.status(200).json({ welcome : 'Web 20 Developers'})
})

server.get('/paid', gate,  (req,res) => {
  res.status(200).json({ welcome : 'to the mines of Moria'})
})

server.use('/api/hubs', hubsRouter);

function addName(req, res, next) {
  // add the name to the request
  const name = "Web 20 Developers";
  req.teamName = name;
}

server.get('/', addName, (req, res) => {
  const nameInsert = (req.teamName) ? ` ${req.teamName}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

server.use(errorHandler);
function errorHandler(error, req, res, next) {
  console.log(error);
  res.status(401).json({you : 'Shall not pass!'})
};


module.exports = server;
