var express = require('express');
var router = express.Router();
var fs = require('fs');

// bearbetar data som ska till skärmen
// läser in befintliga rader från filen
router.get('/', function(req, res, next) {

      // bygger upp html-sidan
      var html = ""; 
      html += "<body>"; 
  
      // när formuläret submittas exekveras koden i router.post
      html += "<form action='/admin' method='post' name='form1'>";
      html += "Namn: <input type='text' name='namn'><br/>";
      html += "Lösenord: <input type='password' name='password'><br/>";
      html += "<input type='submit' value='logga in'><br/>";
      html += "</form>";
      html += "</body>";
  
      // sänder till webbläsaren
      res.send(html);
});

// hämtar data från skärmen, bearbetar och lägger ut nytt data
router.post('/', function(req, res, next) {

      // kontroll av inloggning
      if ((req.body.namn === 'admin') && (req.body.password === 'test')) {

            fs.readFile('mailadress.json', (err,data) => {
                  if (err) throw err;                 // felhantering
                  var adresser = JSON.parse(data);    // gör om jsonfil till textarray
          
                  // kvittens till server
                  res.send(adresser);              
            });
      } else {
            res.send('fel inloggning');  
      };
      
});
    
    module.exports = router;