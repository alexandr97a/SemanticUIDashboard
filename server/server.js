const express = require('express');
const app = express();

const sequelize = require('./models').sequelize;
const bodyParser = require('body-parser');

sequelize.sync();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const {
    Customer,
    Table,
    Coment,
    Sequelize: { Op }
  } = require('./models');
sequelize.query('SET NAMES utf8;');

// 이후 추가할 코드 영역

app.post('/add/table', (req, res) => {
    Table.create({
        table_title : req.body.table_title,
        table_autor : req.body.table_autor,
        table_text : req.body.table_text
    })
    .then( result => {
        res.send(result)
    })
    .catch( err => {
        console.log(err)
        throw err;
    })
})
//메인 페이지
app.get('/get/table', (req, res) => {
    Table.findAll()
     .then( result => { res.send(result) })
     .catch( err => { throw err })
 }) 

 app.get('/table/:id',(req,res)=>{
    // console.log('------------',req);

     Table.findOne({
         where:{
             table_id:req.params.id
         }
     })
     .then( result => { res.send(result) })
     .catch( err => { throw err })
 })

 app.post('/delete/table', (req, res) => {
    Table.destroy({
        where : { table_id : req.body.delete.id }
    })
    .then( res.sendStatus(200) )
    .catch( err => { throw err })
})

app.post("/save/table_data",(req,res)=>{

            let data = req.body.modify.table_title;
            let dbtitle = JSON.stringify(data)
            let parse = JSON.parse(dbtitle)
            console.log('1',parse)
            let tTitle;
            let tAutor;
            let tText;
            tTitle = (parse.table_title);
            tAutor = (parse.table_autor);
            tText = (parse.table_text);
            console.log('2',tTitle)
            console.log('3',tAutor)
            console.log('4',tText)

            Table.update({
                table_title: tTitle,
                table_autor: tAutor,
                table_text: tText
            },{
                where:{
                    table_id: req.body.modify.id
                }
        })
    .then( result => { res.send(result) })
    .catch( err => { throw err })
})

app.post('/add/coment', (req, res) => {
    Coment.create({
        coment_autor : req.body.coment_autor,
        coment_text : req.body.coment_text,
        tableTableId: req.body.table_id,
    })
    .then( result => {
        res.send(result)
    })
    .catch( err => {
        console.log(err)
        throw err;
    })
})

app.get('/get/coment/:id', (req, res) => {
    console.log('req.params.id  ',req.params.id  )
    Coment.findAll({
        where: {
            tableTableId: req.params.id  
          }
            })
     .then( result => { res.send(result) })
     .catch( err => { throw err })
 }) 

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})