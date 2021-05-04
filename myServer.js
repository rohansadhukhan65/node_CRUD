// import database connection 
require('./database/dbcon');

const path = require('path');

// ================================  =======================   ==========================
// ================================  Create Express Function   ==========================
// ================================  =======================   ==========================

// import express
const express = require('express');

// creaate express functiion
var app = express();

// ================================  ===========================   ==========================
// ================================  Create Express Function end   ==========================
// ================================  ===========================   ==========================



 




// Link controller files to make rout easy
const controller = require('./controller/controller');
app.use(controller);





// Setting up the public directory
app.use( express.static('static'));
 

 



// =======================================   =============================  ==============================
// =======================================   Server Creation using express  ==============================
// =======================================   =============================  ==============================
// Provide Port No
const portNo = 3000;

// Start Server
app.listen(portNo, () => {
    console.log(`\n\n Server    : Started ! Your server available at http://localhost:${portNo} `);
    
});
// =======================================   ==================================  ==============================
// =======================================   Server Creation using express end  ============================
// =======================================   ==================================  ==============================

