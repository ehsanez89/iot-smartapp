const express = require('express');
const DB_Handler = require('../db/DB_Handler')
const router = express.Router();
const bodyParser = require('body-parser');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.use(express.urlencoded({ extended: true }))

router.use(express.json());

let db =new DB_Handler()

router.post('/', async (req, res) => {

    db.login( req.body.email , req.body.password, 
        (err,result) =>{
        if(result){
            res.status(200).send({
                message: 'success',result
            });
        }
        else{
            res.status(400).send({
                message: 'failed',result
            });
        }
    })
});


module.exports = router;
