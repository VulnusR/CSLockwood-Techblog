const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// route to homepage
router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            attributes: ['id', 'title', 'timestamp', 'post_content'],
            include: [
                {
                    model: User,
                    attributes: ['username']
                }, 
                {
                    model: Comment, 
                    attributes: ['timestamp', 'comment_content'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        });
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('homepage', { posts, logged_in: req.session.logged_in });
      
    } catch (err) {
        res.status(500).json(err);
    }
});


  
module.exports = router;