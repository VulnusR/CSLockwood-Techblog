const { Comment } = require('../models');

const commentData = [
    {
        user_id: 1,
        post_id: 1,
        timestamp: "05-13-2023",
        comment_text: "Nooooooooooooo! MaNcHeStEr CiTy is only good because of oil--they can't be allowed to win!"
    },

    {
        user_id: 2,
        post_id: 3,
        timestamp: "06-20-2023",
        comment_text: "yeah! Ive seen the Office 34 times."
    },

    {
        user_id: 3,
        post_id: 2,
        timestamp: "07-08-2023",
        comment_text: "It's true. Elon Musk isnt a genius, he's just like every other capitalist in the Oligarch class."
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;