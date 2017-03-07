var User = require('../models/User')

exports.store = function (req , res) {

    if(!req.body) {
        res
            .status(403)
            .json({error: true, message: 'Body empty'})
    }

    let _user = req.body;

    User.create(_user)
        .then(function(user) {
            res
                .status(201)
                .json({user: user})
        })
        .catch(function(error) {
            res
                .status(402)
                .json({error: error})
        });

};

exports.auth = function (req , res) {
    User.auth(req.email , req.password)
        .then(function (user) {
            res
                .status(201)
                .json({'id_token': user.toJSON().uid})
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
};