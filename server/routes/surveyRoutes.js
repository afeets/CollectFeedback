const keys = require ('../config/keys');
const mongoose = require('mongoose');
const requireLogin = require ('../middlewares/requireLogin');
const requireCredit = require ('../middlewares/requireCredit');

const Survey = mongoose.model('surveys');

// route handler
module.exports = (app) => {
    app.post('/api/surveys', requireLogin, requireCredit, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        // new instance of survey
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => { return ({ email: email.trim() })}), // return object
            _user: req.user.id,
            dateSent: Date.now()
        });
    });
};
