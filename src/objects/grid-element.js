export default class GridElement { 
    _spritePath;
    _type;
    _rotation;

    get spritePath() { return this._spritePath; }
    get type() { return this._type; }
    get rotation() { return this._rotation; }

    constructor(type) { 
        this._type = type;
    }

}
