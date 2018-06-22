const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../model/user');
const auth = require('../config/token');

const objId = require('mongoose').Types.ObjectId;


//Get all the users
router.get('/',auth,(req,res,next)=>{
    User.find()
    .exec()
    .then(data=>{
        res.json(data);
    })
    .catch(next);
});

//Update a User
router.put('/:id',auth,(req,res,next)=>{
    if(!objId.isValid(req.params.id))
        return res.json({status:false,msg:"Invalid user id"});
    User.findById(req.params.id)
    .exec()
    .then((data)=>{
        if(data.length < 1){
            res.json({status:false,msg:"No user found"});
        }else{
            bcrypt.hash(req.body.password,10,(err,hashPassword)=>{
                if(err){
                    res.json({status:false,msg:err});
                }else{
                    const user = {
                        email:req.body.email,
                        password:hashPassword
                    };
                    User.findByIdAndUpdate(req.params.id,{$set:user},{new:true})
                    .exec()
                    .then((data)=>{
                        res.json({status:true,msg:"User updated successfully"})
                    })
                    .catch(next);    
                }
            });
        }
    }).catch(next);
});

//Delete a User
router.delete('/:id',auth,(req,res,next)=>{
    if(!objId.isValid(req.params.id))
        return res.json({status:false,msg:"Invalid user id"});
    User.findByIdAndRemove(req.params.id)
    .exec()
    .then((data)=>{
        res.json({status:true,msg:"user Deleted successfully"});
    })
    .catch(next);
});

//add a new user
router.post('/',(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then((data)=>{
        if(data.length >= 1){
            res.json({status:false,msg: "email already in use"});
        }else{
            bcrypt.hash(req.body.password,10,(err,hashPassword)=>{
                if(err){
                    return res.json({status:false,msg:err});
                }else{
                    const user = new User({
                        email:req.body.email,
                        password:hashPassword
                    });
                    user.save()
                    .then((data)=>{
                        res.json(data);
                    })
                    .catch(next);
                }
            });
        }
    });
});

//login route to autharize the user and get token the token secreat is citicollege and expirse in 1hr
router.post("/login",(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then((user)=>{
        if(user.length < 1){
            return res.json({status:false,msg:"Auth failed"});
        }
        bcrypt.compare(req.body.password,user[0].password,(err,data)=>{
            if(err){
                return res.json({status:false,msg:err});
            }else{
                if(data){
                    //the token secreat key is created and set expire timeing encrypted by citicollege
                    const token = jwt.sign({id:user[0]._id},'citicollege',{expiresIn:'1hr'});
                    return res.json({status:true,msg:'Auth successful',token:token});
                }else{
                    return res.json({status:false,msg:"Auth failed"});
                }    
            }
        });
    })
    .catch(next)
});

module.exports = router;