export default class GridElement { 
    sprite;
    _spritePath;
    _type;
    _rotation;

    set sprite(value) {
        if (this.sprite) this.sprite.destroy()
        this.sprite = value;
    }
    get spritePath() { return this._spritePath; }
    get type() { return this._type; }
    get rotation() { return this._rotation; }

    constructor(type) { 
        this._type = type;
    }

    destroy() {
        if (this.sprite) {
            this.sprite.destroy(); // Removes the sprite from the scene
            this.sprite = null; // Nullify the reference for garbage collection
        }

        this._spritePath = null;
        this._type = null;
        this._rotation = null;
    }

}
