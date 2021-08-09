const express = require('express');
const app = express();

const sequelize = require('./models').sequelize;
const bodyParser = require('body-parser');

sequelize.sync();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bcrypt');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const {
    Table,
    Coment,
    User,
    Sequelize: { Op }
  } = require('./models');
sequelize.query('SET NAMES utf8;');


app.use(flash())
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat'
}));
app.use(passport.initialize());

// require('./models/passport')(passport, sequelize.user);

passport.serializeUser(function (user, done) {
    // console.log("serializeadmins", user)
    done(null, user.user_email);
});

passport.deserializeUser(function (user_email, done) {
    User.findByPk(user_email, function (err, user) {
        done(err, user);
    });
});


passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, username, password, done) {
    User
        .findOne({
            where: {
                user_email: username
                
            }
        })
        .then(function (user) {
            if (!user) {
                console.log('Email does not exist');
                return done(null, false, {
                    message: 'Email does not exist'
                });
            }
            bCrypt.compare(password, user.user_password, function (err, matches) {
                console.log('password', password)
                console.log('user.user_password', user.user_password)
                
                if (err)
                    console.log('Error while checking password');
                else if (matches) {
                    console.log('The password matches!');
                    var userInfo = user.get();
                    console.log("login success", userInfo);
                    req.session.user = userInfo;
                    return done(null, userInfo);
                } else {
                    console.log('The password does NOT match!');
                    return done(null, false, {
                        message: 'Something went wrong with your Signin'
                    });
                } 
            });
        })
        .catch(function (err) {
            console.log("Error:!!", err);
            return done(null, false, {
                message: 'Something went wrong with your Signin'
            });
        });
}));

// app.get('/admin_login', function (req, res, next) {     res.render('home',
// {"user_id": req.user.ID}); });

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));
 
app.get('/logout', (req, res) => {
    console.log("logout");
    req.logOut();
    res.redirect('/');
});

//로그인
app.get('/login', (req, res) => { 
    console.log("login success", req.session.user);  // 이거 이상함 
    res.send(req.session.user);
})

app.get('/', (req, res) => {
    res.redirect('http://127.0.0.1:3000/');
})






 













// 이후 추가할 코드 영역
app.post('/add/user', (req, res) => {
    User.create({
        user_name : req.body.user_name,
        user_email : req.body.user_email,
        user_password: bCrypt.hashSync(req.body.user_password, bCrypt.genSaltSync(10),null),
        user_phone : req.body.user_phone,
        user_birthday : req.body.user_birthday
    })
    .then( result => {
        res.send(result)
    })
    .catch( err => {
        console.log(err)
        throw err;
    })
})


app.post('/add/table', (req, res) => {
    Table.create({
        table_title : req.body.table_title,
        table_autor : req.session.user.user_name,
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
        coment_autor : req.session.user.user_name,
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
    Coment.findAll({
        where: {
            tableTableId: req.params.id  
          }
            })
     .then( result => { res.send(result) })
     .catch( err => { throw err })
 }) 

 app.post('/delete/coment', (req, res) => {
    Coment.destroy({
        where : { coment_id : req.body.delete.id }
    })
    .then( res.sendStatus(200) )
    .catch( err => { throw err })
})

app.post("/save/coment_data", (req, res) => {
    console.log('req.body.modify.id',req.body.modify.id)
            Coment.update({
                coment_text: req.body.modify.coment_edit_text,
            },{
                where:{
                    coment_id: req.body.modify.id
                }
        })
    .then( result => { res.send(result) })
    .catch( err => { throw err })
})


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})