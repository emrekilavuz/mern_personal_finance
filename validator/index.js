exports.userSignUpValidator = (req, res, next) => {
    req.check("name", "name is required").notEmpty();
    req.check("email", "Email must be between 3 to 32 characters")
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({
            min : 4,
            max: 32
        });
        req.check('password', 'Password is required').notEmpty();
        req.check('password')
        .isLength({min:6})
        .withMessage("password must contain at least 6 characters");
        req.assert('password_repeat', 'Passwords do not match').equals(req.body.password);
    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error : firstError});
    }
    next();
};