module.exports = (app, passport) => {
    app.get('/', (req, res) => {
      res.render('index');
    });

    app.get('/home', isLoggedIn, (req, res) => {
      res.render('home');
    });
  
    function isLoggedIn(req, res, next) {
      if (req.isAuthenticated()) return next();
  
      res.redirect('/signin');
    }
  };
  