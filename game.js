const express = require('express');
const game = express();
const path = require('path');
const port = 3000;

game.use('/css', express.static('css'));
game.use('/fonts', express.static('fonts'));
game.use('/img', express.static('img'));
game.use('/audio', express.static('audio'));
game.use('/lib', express.static('lib'));
game.use('/html', express.static('html'));
game.use('/game', express.static('game'));

game.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/index.html'));
});

game.listen(port, () => console.log(`Example app listening on port ${port}!`));
