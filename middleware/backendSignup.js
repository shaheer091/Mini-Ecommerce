const validator = require('validator')
let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const validEmail = (email) => validator.isEmail(email)

const validPassword = (password) => passwordPattern.test(password)

const validUser = (req, res, next) => {
    const { email, password } = req.body

    if (!validEmail(email)) {
        res.session.message = 'Enter valid email'
    }
    if (!validPassword(password)) {
        res.session.message = 'Enter valid password'
    }
    next()
}

module.exports = validUser