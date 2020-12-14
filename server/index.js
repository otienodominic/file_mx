const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const bodyParser = require('body-parser');
const cors = require('cors')

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;
const {MONGODB_URL } = require('./config')

const db = require('./models')

const Router = require('./routes')



// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();

  app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  // Database connections here!!

  db.mongoose
  .connect(process.env.MONGODB_URL , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");    
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// API Calls do go here below!

app.use('/api', Router)


  // All remaining requests return the React app, so it can handle routing.
  app.use(express.static(path.join(__dirname, 'public')));
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  // cors origin URL - Allow inbound traffic from origin
corsOptions = {
  origin: "https://file-mx.herokuapp.com",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

  app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  });
}
