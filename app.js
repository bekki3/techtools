const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");

const fileUpload = require('express-fileupload');
const PDFDocument = require('pdfkit');

app.use(fileUpload());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.json());
app.set("view engine", "ejs");


app.get("/", (req, res)=> {
    res.render("main");
});

app.get("/black-screen", (req, res)=> {
    res.render("black-screen");
});
app.get("/white-screen", (req, res)=> {
    res.render("white-screen");
});
app.get("/test-screen", (req, res)=> {
    res.render("test-screen");
});
app.get("/img-to-pdf", (req, res)=> {
    res.render("img-to-pdf");
})

app.post('/img-to-pdf', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    let sampleFile = req.files.sampleFile;
    let uploadPath = __dirname + '/uploads/' + sampleFile.name;
  
    sampleFile.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);
  
      const doc = new PDFDocument();
      let filename = 'output.pdf';
      res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
      res.setHeader('Content-type', 'application/pdf');
      doc.image(uploadPath, 0, 15, {width: 300});
      doc.pipe(res);
      doc.end();
    });
  });




app.listen(3000, ()=> {
    console.log("Listening on 3000");
})