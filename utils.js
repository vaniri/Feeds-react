let userObj = {};

function getColor(user) {
    const colors =["#007bff", "#a10fd0", "#00daff", "#23d60f", "#2a12e6", "#e61224"];
    let color = colors[Math.floor(Math.random() * colors.length)];

    if(!userObj[user]) {
        userObj[user] = color;
    } 

    return userObj[user];

}

module.exports = { getColor };