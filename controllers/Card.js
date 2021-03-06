var Card = require('../models/Card')

exports.index = function(req, res) {

    Card.get()
        .then((snap) => {
            res.render('cards/index' , {
                cards: snap.val(),
                msg:  req.flash('notices')[0]
            });
        });

};

exports.create = function (req , res) {
    res.render('cards/create' , {
        errors: req.session.errors,
        success: req.session.success,
        card: {}
    });
};

exports.store = function (req , res) {
    req.check('number' , 'Tarjeta de creditoDebe ser un numero').notEmpty().isInt();
    req.check('cvv' , 'el Cvv debe ser un numero').isLength({min:3 , max:4}).isInt();

    var errors = req.validationErrors();
    if (errors){
        req.session.errors = errors;
        res.redirect('/cards/create');
        req.session.success = false;

    }else{
        req.session.success = true;

        req.flash('notices', {'type': 'info' , 'msg': 'Tarjeta creada'});

        Card.create(req.body);
        res.redirect('/cards');
    }
};

exports.edit = function (req , res , next) {

    if (!req.params.id){
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    }

    Card.find(req.params.id)
        .then((snap) => {
            if (!snap.val()){
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
            }else{
                res.render('cards/edit' , {
                    card: snap.val(),
                    errors: req.session.errors,
                    success: req.session.success
                });
            }
        })

};

exports.update = function (req , res , next) {
    if (!req.params.id){
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    }

    req.check('number' , 'Tarjeta de creditoDebe ser un numero').notEmpty().isInt();
    req.check('cvv' , 'el Cvv debe ser un numero').isLength({min:3 , max:4}).isInt();

    var errors = req.validationErrors();
    if (errors){
        req.session.errors = errors;
        res.redirect('/cards/' + req.params.id + '/edit');
        req.session.success = false;

    }else{
        req.session.success = true;

        req.flash('notices', {'type': 'warning' , 'msg': 'Tarjeta actualizada'});

        Card.update(req.params.id, req.body);
        res.redirect('/cards');
    }
};

exports.destroy = function (req , res , next) {

    if (!req.params.id){
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    }

    req.flash('notices', {'type': 'danger' , 'msg': 'Tarjeta eliminada'});

    Card.destroy(req.params.id);

    res.redirect('/cards');
};

