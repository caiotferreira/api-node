var User = require('../models/User');

var router = express.Router(); 

router.post('register', async(req, res) => {
    try {
        var user = await User.create(req.body);
    
        return res.send({ user });
    } catch (err) {
        return res.status(400).send({ error: 'Falha em realizar o registro' });
    }
});

module.exports = app => app.use('/auth', router);