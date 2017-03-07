const connection =  require('../config/connections')
var table = 'users';

var _this = connection.firebase.database().ref(table);



exports.create =  function (data) {
    return connection.firebase.auth().createUser({
        email: data.email,
        emailVerified: false,
        password: data.password,
        disabled: false
    })
};

exports.auth = function (email , password) {
    return connection.firebase.auth()
        .getUserByEmail(email);
};