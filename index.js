var express = require('express'),
  app = express(),
  bodyParser = require('body-parser');


var urlencodedParser = bodyParser.urlencoded({ extended: false });    //body-parser
app.use(express.static(__dirname + '/public'));

var session = require('express-session')                              //session

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(session({
  secret: 'keyboard cat', cookie: { maxAge: 60000 },  
  resave: false, saveUninitialized: false
}))

app.use(function (req, res, next) {
  var sess = req.session
  next();
})

app.post('/admin', urlencodedParser, function (req, res) {
  console.log("Login");
  console.log("User: " + req.body.email);

  req.session.email = req.body.email;
  req.session.password = req.body.password;

  if (req.session.email == "np@gmail.com" && req.session.password == '1224') {
    res.render('admin', { hello: "Hello", login: req.session.email, link: 'logout' })
  }

  else {
    res.render('admin', { hello: "", login: 'Please login first.', link: 'login' })  
  }
});

app.get('/', urlencodedParser, function (req, res) {                         
  if (req.session.email == "np@gmail.com" && req.session.password == '1224') {

    res.render('admin', { hello: "Hello", login: req.session.email, link: 'logout' })
    console.log("Complete");
  }
  else {
    res.render('admin', { hello: "", login: 'Please login first.', link: 'login' })  //ejs
    console.log("Fail");
  }

});

app.get('/admin', urlencodedParser, function (req, res) {                         
  if (req.session.email == "np@gmail.com" && req.session.password == '1224') {

    res.render('admin', { hello: "Hello", login: req.session.email, link: 'logout' })
    console.log("Complete");
  }
  else {
    res.render('admin', { hello: "", login: 'Please login first.', link: 'login' })  //ejs
    console.log("Fail");
  }

});

app.get('/', urlencodedParser, function (req, res) {                         
  if (req.session.email == "np@gmail.com" && req.session.password == '1224') {
    res.render('admin', { hello: "Hello", login: req.session.email, link: 'logout' })
    console.log("Complete");
  }
  else {
    res.render('admin', { hello: "", login: 'Please login first.', link: 'login' })  //ejs
    console.log("Fail");
  }

});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('destroy session');
      res.redirect('/form.html');
    }
  });
});

app.listen(8000);