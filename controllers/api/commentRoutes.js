const router = require('express').Router();
const { Comment, Post, User } = require('../../models');

// get all comments
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            attributes: ['id', 'timestamp', 'comment_content'],
            include: [
                {
                    model: User, 
                    attributes: ['id', 'username']
                }, 
                {
                    model: Post,
                    attributes: ['id', 'title', 'timestamp']  
                }
            ]
        });
        console.log(commentData)
        if(!commentData) {
            res.status(404).json({ message: "Couldn't get comments"});
            return;
        }
        res.status(200).json(commentData); 
    } catch (err) {
        res.status(500).json(err);
    }
});

// get comment by id
router.get('/:id', async (req, res) => {
    try {
        const singleComment = await Comment.findByPk(req.params.id, {
            attributes: ['id', 'timestamp', 'comment_content'],
            include: [
                {
                    model: User, 
                    attributes: ['id', 'username']
                }, 
                {
                    model: Post,
                    attributes: ['id', 'title', 'timestamp']  
                }
            ]
        });
        console.log(singleComment)
        if(!singleComment) {
            res.status(404).json({ message: "No comment with this ID!"});
            return;
        }
        res.status(200).json(singleComment); 
    } catch (err) {
        res.status(500).json(err);
    }
});

// create new comment
router.post('/', async (req, res) => {
    console.log('user id:');
    console.log(req.session.user_id)
    try {
   const newComment = await Comment.create({
    ...req.body,
    post_id: req.body.post_id,
    user_id: req.session.user_id,
    timestamp: Date.now()
    });
        if(!newComment) {
            res.status(404).json({ message: 'Please enter comment info'});
            return;
        }
        res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// update a comment by id
router.put('/:id', async (req, res) => {
    try {
        const commentToUpdate = await Comment.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if(!commentToUpdate[0]) {
            res.status(400).json({ message: 'No comment with this ID!' });
            return;
        }
        res.status(200).json(commentToUpdate); 
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete a comment by id
router.delete('/:id', async (req, res) => {
    try {
        const commentToDelete = await Comment.findByPk(req.params.id) 
        Comment.destroy({
            where: {
                id: req.params.id,
            },
        });    
        if(!commentToDelete) {
            res.status(400).json({ message: 'No comment with this ID!' });
            return;
        }
        res.status(200).json(commentToDelete); 
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;