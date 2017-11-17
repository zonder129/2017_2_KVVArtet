import GraphicEngine from './GraphicEngine';
import Utils from './Utils';
import Loader from './Loader';
//import rere from '/views/singleplay/textures/wall.jpg';

export default class Background {
    constructor(numberSchene) {
        this.ratio = 16 / 9;
        this.engine = new GraphicEngine('background', false);
        this.schene = numberSchene;
    }

    static randomInteger() {
        var rand = Math.random() * (4);
        rand = Math.floor(rand);
        return rand;
    }

    InitMapAndSprites() {
        this.engine.addSprite([0, 0], this.textures[4], Utils.madeRectangle(-1, 1, 1, -1));
        let coord = Utils.madeRectangle(0, 0, 1.2 / 16 - 0.015, -(1.2 / 16 - 0.015) * this.ratio);
        global.tiledMap.forEach(function(item, j) {
            item.forEach(function(value, i) {
                if (value.isWall) {
                    let trans = Utils.translationOnMap(i, j);
                    this.engine.addSprite([trans[0] + 0.0075, trans[1] - 0.0075], this.textures[Background.randomInteger()], coord, true);
                }
            }.bind(this));
        }.bind(this));
        this.engine.addSprite([-0.6, 0.65], this.textures[5], Utils.madeRectangle(0, 0, 1.2, -(1.2 / 16) * 12 * this.ratio), true,
            Utils.madeRectangle(0.006, 0.007, 0.9915, 0.993)); // сетка
    }

    render() {
        let loader;
        switch(this.schene) {
            case 0:
                loader = new Loader(['/views/singleplay/textures/wall0.png', '/views/singleplay/textures/wall1.png',
                    '/views/singleplay/textures/wall2.png', '/views/singleplay/textures/wall3.png', '/views/singleplay/textures/back1.png',
                    '/views/singleplay/textures/grid.png'], this.engine.gl);
                break;
        }
        loader.load(this.onLoad.bind(this));
    }
    onLoad(textures) {
        this.textures = textures;
        this.InitMapAndSprites();
        this.engine.render();
    }
}
