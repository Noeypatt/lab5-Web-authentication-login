var express = require('express'),
  app = express(),
  bodyParser = require('body-parser');

app.set('views', './views')
app.set('view engine', 'ejs')


var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static(__dirname + '/public'));

app.post('/login', urlencodedParser, function (req, res) {

  if (req.body.password == '1224' && req.body.email.value !== "") {
    var email = req.body.email;
    app.get('/admin', function (req, res) {
      res.render('admin',{ hello: "Hello",login: email,link:'logout'})
    });
  }

  else {
    app.get('/admin', function (req, res) {
      res.render('admin', { hello: "",login: 'Please login first.',link:'login' })
    })

  }

});
app.listen(8000);