const path = require('path');

const collect = require('collect.js');


// import database
const { user, mongoose } = require('../database/dbcon');


// ================================  ==============================   ==========================
// ================================  Create Express Router Function   ==========================
// ================================  ==============================   ==========================

// import express
const express = require('express');

// creaate express Router function
const controller = express.Router();


// set the view engine to ejs
var ejs = require('ejs');
const app = express();
app.set('view engine', 'ejs');
ejs.open = '{{';
ejs.close = '}}';
// ================================  ==================================   ==========================
// ================================  Create Express Router Function end   ==========================
// ================================  ==================================   ==========================


 









// ========================================   =================  =============================================
// ========================================   Create get method  =============================================
// ========================================   =================  =============================================
// Note : we can send data in node like /?page=1&limit=5

// %%%%%%%%%%%%%%%%%% get method for read %%%%%%%%%%%%%%%%%%
controller.get('/', async (req , res) => {
    let all = await user.find().exec();
    


    

    
    let pagenumber = 1;
    if (req.query.page != undefined) {
         pagenumber = parseInt(req.query.page);
    }
    
    

    let collection = collect(all);
    let datalimit = 5;
    let totalpage = Math.ceil(collection.count() / datalimit);
    let paginateData = collection.forPage(pagenumber, datalimit); // First one is for page number 2nd is for items you wanted to show




    let nextpage = pagenumber + 1;
    if (nextpage > totalpage) { nextpage = 0;}
    
    let prevpage = 0;
    if (pagenumber > 1) { prevpage = pagenumber - 1; }
    

    res.render(path.parse(__dirname).dir + '/views/read.ejs', { name: paginateData.items,totalP:totalpage,next:nextpage,prev:prevpage,currentpage:pagenumber });
     
});



// %%%%%%%%%%%%%%%%% GET method for create %%%%%%%%%%%%%%%%%%%%%%
controller.get('/create', (req, res) => {
    res.render(path.parse(__dirname).dir  + '/views/create.ejs',{msg:'GET'});
});





// %%%%%%%%%%%%%%%%%%% GET method for Update %%%%%%%%%%%%%%%%%%%
controller.get('/update/:id', async (req, res) => {
    let id = req.params.id;
    let dat = await user.findOne({ _id: id }).exec();
    res.render(path.parse(__dirname).dir  + '/views/update.ejs',{id:id,data:dat,msg:'GET'});
});



// %%%%%%%%%%%%%%%%% GET method for Update %%%%%%%%%%%%%%%%
controller.get('/delete/:delid', async (req, res) => {
    let id = req.params.delid;
    let dat = await user.findOne({ _id: id }).exec();
    dat.delete();
    res.redirect('/');
});
// ========================================   =====================  =============================================
// ========================================   Create get method end  =============================================
// ========================================   =====================  =============================================









// ========================================   ==================  =============================================
// ========================================   Create post method  =============================================
// ========================================   ==================  =============================================
// IImport body parser
const bodyParser = require('body-parser');
controller.use(bodyParser.urlencoded({ extended: true }));

// POST for create
controller.post('/create', (req, res) => {
    console.log(req.body);
    const FrmData = req.body;
    
    try {
  
            const Newuser = new user(FrmData);
            Newuser.save();
        
            status = true;
        }
        catch (err) {
            status = false;
            console.log(err);
    }
    
    res.render(path.parse(__dirname).dir  + '/views/create.ejs',{msg:status});

     
});





// POST for update
controller.post('/update/:id', async (req, res) => {
    let id = req.params.id;
    let datpost = await user.findOne({ _id: id }).exec();

    try {
            datpost.name = req.body.name;
            datpost.email = req.body.email;
            datpost.save();
            statusu = true;
         }
    catch (err)
        {
            statusu = false;
            console.log(err);
         }
    res.render(path.parse(__dirname).dir  + '/views/update.ejs',{id:id,data:datpost,msg: statusu});
});


// ========================================   ======================  =============================================
// ========================================   Create post method end  =============================================
// ========================================   ======================  =============================================





// Export Router
module.exports = controller;