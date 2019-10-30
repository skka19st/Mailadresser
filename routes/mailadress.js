// 'require' importerar angiven modul(package)
// 'express' är ett ramverk som underlättar start av server
// 'fs' = FileSystem, dvs hantering av filer 
var express = require('express');
var fs = require('fs');
var router = express.Router();

// läs fil med mailadresser
// .get innebär läsning från filen
router.get('/', function(req, res, next) {
  fs.readFile('mailadress.json', (err,data) => {
    if (err) throw err;
    var mailadress = JSON.parse(data);  // gör om jsonfil till textarray

    // .send visar innehållet på servern (webbläsaren)
    // blir som ett API för andra program
    res.send(mailadress);               
  })
});

module.exports = router;
