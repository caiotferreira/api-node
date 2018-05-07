var express = require('express');
var bodyParser = require('body-parser');
var app = express(); 

var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/api_crud'); //conexão ao banco
mongoose.connect('mongodb://<caio>:<123>@ds117336.mlab.com:17336/api_crud'); //conexão ao banco

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo a porta
var port = process.env.PORT || 8080;

//chamando o model bear.js
var bearSchema = require('./src/models/bear.js');
var ModelBear = mongoose.model(`Bear`, bearSchema);

// ROTAS PARA A API
var router = express.Router();

//rota middleware usado para todas as requisições
router.use(function(req, res, next) {
    console.log('algo está acontecendo');
    next();
});

//testando a rota para ver se está funcionando
router.get('/', function(req, res) {
    res.json({ message: 'ta funcionando' });
})

//rotas que terminam com /bears
router.route('/bears') 
    //cria um bear (acessado atraves de POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        
        var bear = new Bear();
        bear.name = req.body.name; //atribui o nome do bear (vem a partir da requisição)

        //salva o bear e verifica erros

        bear.save(function(err, bear){
            if (err) {
                res.send(err);
            } else {
                res.json({ message: 'Bear criado!' });
            }
        });
    })

    // recupera todos bears (acessado atraves de GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });

// router.post(`/bears`, function(req, res, next) {

//     console.log(req.body.name)
//     ModelBear.create({ name: req.body.name }, function(err) {
//         if(err) return res.json(`err`)

//         return res.json(`sucesso 2`)
//     })

//     // res.json(`sucesso`)
// });

// router.get(`/bears`, function(req, res, next) {

//     let dados = ModelBear.find({name: ``});
//     res.json(dados)

// })


//REGISTRANDO AS ROTAS
app.use('/api', router);


app.listen(port);
console.log('Ta funfando na porta ' + port);