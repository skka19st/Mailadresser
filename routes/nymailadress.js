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
      html += "<form action='/nymailadress' method='post' name='form1'>";
      html += "Mailadress: <input type='text' name='adress'><br/>";
      html += "<input type='submit' value='spara'><br/>";
      html += "</form>";
      html += "</body>";
  
      // sänder till webbläsaren
      res.send(html);
});

// hämtar data från skärmen, bearbetar och lägger ut nytt data
router.post('/', function(req, res, next) {

  // 'req.body.adress' är variabeln body.adress i det hämtade materialet
  var nyadress = {
    'mailadress' : req.body.adress
  };

  fs.readFile('mailadress.json', (err,data) => {
    if (err) throw err;                 // felhantering
    var adresser = JSON.parse(data);    // gör om jsonfil till textarray

    // den nya mailadressen läggs till i den array som skapats
    adresser.push(nyadress);
  
    // omvandla textarray till JSON-format
    // 2 indrag för själva datat i posterna
    var sparadresser = JSON.stringify(adresser, null, 2);
  
    // skriv till filen
    // 'mailadress.json' är den fil som ska skapas
    // 'sparadresser' är det data som ska läggas upp
    // 'err,data' är callback-hantering
    fs.writeFile('mailadress.json',sparadresser, (err,data) => {
      if (err) throw err;             // felhantering
    });

    // kvittens till server
    res.send('mailadress upplagd');

  });
});

module.exports = router;
