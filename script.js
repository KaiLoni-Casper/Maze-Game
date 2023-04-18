let levels = [];

levels[0] = {
    map:[
        [1,1,0,0,1],
        [1,0,0,0,0],
        [0,0,1,1,0],
        [0,0,0,1,0],
        [0,1,0,1,0]
    ],
    player: {
        x:0,
        y:4
    },
    goal:{
        x:4,
        y:1
    },
    theme:'default'
};
function Game(id, level) {
  
    this.el = document.getElementById(id);
    this.tileTypes = ['floor','wall'];
    this.tileDim = 32;
  
    this.map = level.map;
    this.theme = level.theme
    this.player = {...level.player};
    this.goal = {...level.goal};
}

Game.prototype.populateMap = function() {
    this.el.className = 'game-container ' + this.theme;
    let tiles = this.el.querySelector('#tiles');
    for (var y = 0; y < this.map.length; ++y) {
        for (var x = 0; x < this.map[y].length; ++x) {
            let tileCode = this.map[y][x];
            let tileType = this.tileTypes[tileCode];
            let tile = this.createEl(x, y, tileType);
            tiles.appendChild(tile);
        }
    }
}
Game.prototype.createEl = function(x,y,type) {
    let el = document.createElement('div');
    el.className = type;
    el.style.width = el.style.height = this.tileDim + 'px';
    el.style.left = x*this.tileDim + 'px';
    el.style.top = y*this.tileDim + 'px';
    return el;
}
Game.prototype.sizeUp = function() {
    let map  = this.el.querySelector('.game-map');
    map.style.height = this.map.length * this.tileDim + 'px';
    map.style.width = this.map[0].length * this.tileDim + 'px';
}
Game.prototype.placeSprite = function(type) {
    let x = this[type].x
    let y = this[type].y
    let sprite = this.createEl(x, y, type);
    sprite.id = type;
    sprite.style.borderRadius = this.tileDim + 'px';
    let layer = this.el.querySelector('#sprites');
    layer.appendChild(sprite);
    return sprite;
}
Game.prototype.movePlayer = function(event) {
    event.preventDefault();

    if (event.keyCode < 37 || event.keycode > 40) {
        return;
    }
    switch (event.keyCode){
        case 37:
            // left key event
            break;
        case 38:
            // up key event
            break;
        case 39:
            // right key event
            break;
        case 40:
            // down key event
            break;
    }
}
Game.prototype.keyboardListener = function() {
    document.addEventListener('keydown', event => {
        this.movePlayer(event)
    });
}
function init() {
    let myGame = new Game('game-container-1',levels[0]);
    
    myGame.populateMap();
    myGame.sizeUp();
    myGame.placeSprite('goal');
    let playerSprite = myGame.placeSprite('player');
    myGame.player.el = playerSprite;
    myGame.keyboardListener();
}
init();