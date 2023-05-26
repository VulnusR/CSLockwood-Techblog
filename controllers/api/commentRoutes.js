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




module.exports = router;