const router = require('express').Router();
const { Post, User } = require('../models');

// route to update post
router.get('/edit/:id', async (req, res) => {
    try {
        const singlePostData = await Post.findByPk(req.params.id, {
            attributes: ['id', 'title', 'timestamp', 'post_content'],
            include: [
                {
                    model: User,
                    attributes: ['username']
                }, 
            ]
        });
     
            const singlePost = singlePostData.get({ plain: true });
          
            res.render('editpost', { post: singlePost, logged_in: req.session.logged_in });
      
    } catch (err) {
        res.status(500).json(err);
    }
});

  module.exports = router;