const { Post } = require('../models');

const postData = [
    {
        title: "Why Manchester City will win the Treble",
        user_id: 1,
        timestamp: "05-13-2023",
        post_content: "Kevin De Byrune is just too good of a player maker to be shit down."
    },
    {
        title: "Why the Office has maintained its status as a Cultural Heavyweight ",
        user_id: 2,
        timestamp: "06-19-2023",
        post_content: "The Office, despite being off the air for over a decade is still actively watched by millions, with various spin-offs still be made to reflect the differences in varying national humor. It must be indicative of just how ludicrous work-life blance and work enviornments have become."
    },
    {
        title: "Why Elon Musk is Rich...",
        user_id: 3,
        timestamp: "07-08-2023",
        post_content: "Musk wants you to believe he is a self made billionare whose genius has allowed him to pioneer electric cars and new spaceships--the reality is he uses his money to take over the projects and hard work of others. How did he get so rich to begin with? His family used to operate Emerald mines under Arpertied South Africa--employing slave labor to build a vast wealth which he has for the last few decades used to subert new ventures from the people who started them"
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;