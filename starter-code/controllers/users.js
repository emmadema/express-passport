var passport = require("passport");

// GET /signup
//new user
function getSignup(request, response) {
	response.render('signup', {message : request.flash('signupMessage')});
}

// POST /signup
//save user
//create
function postSignup(request, response, next) {
	//we already made local signup in passport.js
	let signupStrategy = passport.authenticate('local-signup',{
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	});

	return signupStrategy(request,response, next);
}

// GET /login
//login page
function getLogin(request, response) { 
	response.render('login', {message: request.flash('loginMessage')});
}

// POST /login 
//is that user in here
function postLogin(request, response, next) {
	let loginStrategy = passport.authenticate('local-login',{
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	});

	return loginStrategy(request, response, next);
}

// GET /logout
function getLogout(request, response) {
}

// Restricted page
function secret(request, response){
}

module.exports = {
  getLogin: getLogin,
  postLogin: postLogin ,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
  secret: secret
};