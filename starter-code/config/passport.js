let LocalStrategy = require('passport-local').Strategy;
let User = require('../models/user');

module.exports = function(passport) {

    passport.serializeUser(function(user, callback) {
        callback(null, user.id);
    });

    passport.deserializeUser(function(id, callback) {
        User.findById(id, function(err, user) {
            callback(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    }, function(req, email, password, callback){
        //Find a user with this email
        User.findOne({'local.email' : email}, function(err,user) {
            if (err) return callback(err);
            // If there already is a user with that email
            if (user) {
                return callback(null, false, req.flash('signupMessage', 'This email is already used.'));
            } else {
                //there is not already a user with that email
                //Create one
                let newUser = new User();
                newUser.local.email = email;
                newUser.local.password = newUser.encrypt(password);
                newUser.save(function(err) {
                    if (err) throw err;
                    return callback(null, newUser);
                });
            }
        });
    }));

    passport.use('local-login', new LocalStrategy({
    	usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
   	}, function(req, email, password, callback) {
    // Search for a user with this email
    User.findOne({ 'local.email' :  email }, function(err, user) {
      if (err) {
        return callback(err);
      }
      // If no user is found
      if (!user) {
        return callback(null, false, req.flash('loginMessage', 'No user found.'));
      }
      // Wrong password
      if (!user.validPassword(password)) {
        return callback(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
      }
      return callback(null, user);
    });
  }));
};



/*let LocalStrategy = require('passport-local').Strategy;
//require local strategey

let User = require('../models/user');
//require the user model in models

module.exports = function(passport){
	//export passport

	//serialize user.id to save it to thier session
	passport.serializeUser(function(user, callback){
		callback(null, user.id);
	});
	passport.deserializeUser(function(id, callback){
		User.findById(id, function(err, user){
			callback(err,user);
		});
	});

	passport.use('local-signup', new LocalStrategy({
		//create a new local strategy
		usernameFeild : 'email', 
		passwordFeild : 'password',
		passReqToCallback : true
	}, function(req, email, password, callback){
		//where we talk to database
		//pass the function the values from local strategy
		User.findOne({'local.email' : email}, function(err,user){
			if (err) return callback(err);
			//if there is already a user with that email tell them to login
			if (user) {
				return callback(null, false, req.flash('signupMessage', 'no free trial for you'));
			} else {
				//there is not already a user with that email
				//create one
				let newUser = new User();
				newUser.local.email = email;
				newUser.local.password = newUser.encrypt(password);
				newUser.save(function(err){
					if (err) throw err; 
					return callback(null, newUser);
				});
			}
		});

	}));

};*/