const path = require('path');
const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
require('dotenv').load();
const exphbs = require('express-handlebars');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const stream = require('./utils/stream');
const flash = require('connect-flash');
const fileSystem = require('./utils/fileSystem');

// BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect Flash
app.use(flash());

// Passport
app.use(
  session({ secret: 'btpn2020', resave: true, saveUninitialized: true })
); // session secret
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
const viewsPath = path.join(__dirname, 'views');
const layoutsPath = path.join(viewsPath, 'layouts');
const partialsPath = path.join(viewsPath, 'partials');
app.set('views', viewsPath);

const exphbsConfig = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: layoutsPath,
  partialsDir: [partialsPath],
  extname: '.hbs'
});

app.engine('hbs', exphbsConfig.engine);
app.set('view engine', '.hbs');

// make counter handlebars
exphbsConfig.handlebars.registerHelper("counter", function (index) {
  return index + 1;
});

// Models
const models = require('./models');

// Express static assets
app.use(express.static("public"));
app.use('/canvas-designer', express.static('node_modules/canvas-designer/'));

// Routes
require('./controllers/auth.controller.js')(app, passport);
require('./controllers/view.controller.js')(app, passport);
require('./controllers/customer.controller')(app);
require('./controllers/utility.controller')(app);
// Load passport strategies
require('./config/passport/passport.js')(passport, models.user);

// Initialize port
const port = process.env.PORT || 3000


// Initialize storage temp
fileSystem.createFolder('temp');

global.__basedir = __dirname;

// Sync Database
models.sequelize
  .sync()
  .then(function () {
    io.of('/stream').on('connection', stream);

    server.listen(port, function (err) {
      if (!err) console.log(`Connected at http://localhost:${port}`);
      else console.log(err);
    });
  })
  .catch(function (err) {
    console.log(err, 'Error on Database Sync. Please try again!');
  });
