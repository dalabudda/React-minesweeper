const MIN_SIZE_X = 7;
const MIN_SIZE_Y = 1;

class Options {
    constructor(sizeX, sizeY, mines) {
		this.set(sizeX, sizeY, mines);
    }
    
	set(sizeX, sizeY, mines) {
		this.sizeX = this.validateX(sizeX);
		this.sizeY = this.validateY(sizeY);
		this.mines = this.validateM(mines);
	}

    validateX(sizeX) {
        sizeX = parseInt(sizeX);
        if (isNaN(sizeX))
            return MIN_SIZE_X;
        if (sizeX < MIN_SIZE_X)
            return MIN_SIZE_X;
        return sizeX;
    }

    validateY(sizeY) {
        sizeY = parseInt(sizeY);
        if (isNaN(sizeY))
            return MIN_SIZE_Y;
        if (sizeY < MIN_SIZE_Y)
            return MIN_SIZE_Y;
        return sizeY;
    }

    validateM(mines) {
        mines = parseInt(mines);
        if (isNaN(mines))
            return 1;
        if (mines < 1)
            return 1;
        if (this.sizeX*this.sizeY <= 10)
            return 1;
        let freeSpace = this.sizeX*this.sizeY - 9;
        if (mines > freeSpace)
            return freeSpace;
        return mines;
    }
}

export default Options;
