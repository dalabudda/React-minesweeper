function BoardGenerator(board, x, y) {
	function generateMines() {
		for (let i = 0; i < board.allMines; ++i) {
			let X, Y;
			do {
				X = random(board.sizeX);
				Y = random(board.sizeY);
			}
			while(!goodPlaceForMine(X, Y));//Endless?
        }
    }
    
	function goodPlaceForMine(X, Y) {
		if (X < x-1 || X > x+1 || //clicked area
			Y < y-1 || Y > y+1) {
			let cell = board.cells[Y][X];
			if (cell.type != 'mine') {
				cell.type = 'mine';
				return true;
			}
		}
		return false;
    }
    
	function random(limit) {
		return Math.floor((Math.random() * limit));
    }
    
	function generateNumbers() {
		board.forAll(cell => {
			if (cell.type != 'mine') {
                let count = countMines(cell.props.pos);
				cell.type = 'c' + count;
			}
        });
    }

    function countMines(pos) {
        let count = 0;
        board.forArea(pos.x, pos.y, cell => {
            if (cell.type == 'mine')
                count++;
        });
        return count;
    }

    generateMines();
    generateNumbers();
}

export default BoardGenerator;
