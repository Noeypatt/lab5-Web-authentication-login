var express = require('express'),
  app = express(),
  bodyParser = require('body-parser');

  app.set('views', './views')
  app.set('view engine', 'ejs')

var session = require('express-session')

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 },  //session
   resave : false, saveUninitialized: false }))

var urlencodedParser = bodyParser.urlencoded({ extended: false });    //body-parser
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
  var sess = req.session
  next();
})

app.post('/login', urlencodedParser, function (req, res) {
  console.log("Login");
  console.log("User: "+req.body.email);

  req.session.email =  req.body.email;
  req.session.password =  req.body.password;

  if (req.session.email == "5935512027" && req.session.password == '1224') {
    var email = req.session.email;

    app.get('/admin', function (req, res) {
      res.render('admin',{ hello: "Hello",login: email,link:'logout'})
      console.log("Complete");
    });
  }

  else {
    app.get('/admin', function (req, res) {                                           //ejs
      res.render('admin', { hello: "",login: 'Please login first.',link:'login' })
      console.log("Fail");
    })

  }
});



app.listen(8000);