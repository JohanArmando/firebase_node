module.exports.controller = function(app , controller) {

    app.route('/cards')
        .get(controller.index);

};