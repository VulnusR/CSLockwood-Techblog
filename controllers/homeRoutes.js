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

// route to login page
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }

    res.render('login');
});

// route to signup page
router.get('/signup', (req, res) => {
    res.render('signup');
});

// route to dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }, {model: Comment}],
        });
        console.log(userData)

        const user = userData.get({ plain: true });

    // If the user is not logged in, redirect the request to the login page
        if (!req.session.logged_in) {
            res.redirect('/login');
            return;
          }
          console.log(user)
        res.render('dashboard', {
            ...user, 
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// route to single post
router.get('/posts/:id', async (req, res) => {
    try {
        const singlePostData = await Post.findByPk(req.params.id, {
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
     
            const singlePost = singlePostData.get({ plain: true });
          
            res.render('singlepost', { post: singlePost, logged_in: req.session.logged_in });
      
    } catch (err) {
        res.status(500).json(err);
    }
});
  
module.exports = router;