module.exports = (req, res, next) => {
    // check user is signed in
    if(req.user.credits < 1){
        return res.status(403).send({ error: 'Not enough credits'});
    }

    next();
};