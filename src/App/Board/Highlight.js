class Highlight {
	constructor(board) {
		this.board = board;
		this.x = 0;
		this.y = 0;
	}
	update(x, y) {
		this.clear();
		this.x = x;
		this.y = y;
		this.board.forArea(x, y, cell => {
			if (cell.state.view == 'hidden')
				cell.setState({ view: 'highlight' });
		});
	}
	
	clear() {
		this.board.forArea(this.x, this.y, cell => {
            if (cell.state.view == 'highlight')
			    cell.setState({ view: 'hidden' });
		});
	}
}

export default Highlight;
