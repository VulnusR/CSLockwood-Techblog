const router = require('express').Router();

const { Comment, Post, User } = require('../../models');

// get all users
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Post,
                    attributes: ['title', 'timestamp']
                }, 
                {
                    model: Comment, 
                    attributes: ['timestamp', 'comment_content']
                }
            ]
        });
        console.log(userData)
        if(!userData) {
            res.status(404).json({ message: "Couldn't get users"});
            return;
        }
        res.status(200).json(userData); 
    } catch (err) {
        res.status(500).json(err);
    }
});

// get user by id
router.get('/:id', async (req, res) => {
    try {
        const singleUser = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Post,
                    attributes: ['title', 'timestamp']
                }, 
                {
                    model: Comment, 
                    attributes: ['timestamp', 'comment_content']
                }
            ]
        });
        console.log(singleUser)
        if(!singleUser) {
            res.status(404).json({ message: "No user with this ID!"});
            return;
        }
        res.status(200).json(singleUser); 
    } catch (err) {
        res.status(500).json(err);
    }
});

// create new user
router.post('/', async (req, res) => {
    try {
   const newUser = await User.create(req.body);
    req.session.save(() => {
        req.session.user_id = newUser.id;
        req.session.logged_in = true;
        console.log(req.session);
        res.status(200).json(newUser);
    });
        if(!newUser) {
            res.status(404).json({ message: 'Please enter user info'});
            return;
        }
        
    } catch (err) {
        res.status(500).json(err);
    }
});




module.exports = router;