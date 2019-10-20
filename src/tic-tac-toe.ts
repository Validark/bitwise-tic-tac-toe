const Winners = [
	0b00_00_00_00_00_00_11_11_11,
	0b11_11_11_00_00_00_00_00_00,
	0b00_00_00_11_11_11_00_00_00,
	0b11_00_00_11_00_00_11_00_00,
	0b00_11_00_00_11_00_00_11_00,
	0b00_00_11_00_00_11_00_00_11,
	0b11_00_00_00_11_00_00_00_11,
	0b00_00_11_00_11_00_11_00_00
];

const XWinners = Winners.map(n => n & 0b10_10_10_10_10_10_10_10_10);
const OWinners = Winners.map(n => n & 0b01_01_01_01_01_01_01_01_01);

function checkWinner(this: { state: number }, x: number) {
	return (this.state & x) === x;
}

/** Creates a Tick-Tack-Toe 3 in a row game.
 * X always starts first. X and O alternate placing their mark on a 3x3 matrix.
 * (0, 0) is the top left, and (2, 2) is the bottom right.
 * The order of the aforementioned points is (row, column) [See here](https://en.wikipedia.org/wiki/File:Matris.png#/media/File:Matris.png)
 */
class TicTacToe {
	/** The value which holds the game's state.
	 * Each pair of 0's below is an empty slot.
	 * If any slot is changed to 10, it is an "x".
	 * If any slot is changed to 01, it is an "o".
	 *
	 * The furthest right in the number is (0, 0). Next is (0, 1), (0, 2), (1, 0) and so on.
	 */
	public state = 0b00_00_00_00_00_00_00_00_00;

	/** The turn number, starting at 1. */
	public turn = 1;

	public render() {
		console.log(this.getFieldValue(0, 0) || "-", this.getFieldValue(0, 1) || "-", this.getFieldValue(0, 2) || "-");
		console.log(this.getFieldValue(1, 0) || "-", this.getFieldValue(1, 1) || "-", this.getFieldValue(1, 2) || "-");
		console.log(this.getFieldValue(2, 0) || "-", this.getFieldValue(2, 1) || "-", this.getFieldValue(2, 2) || "-");
	}

	public getCurrentPlayerSymbol() {
		return this.turn & 1 ? "x" : "o";
	}

	/** Doesn't support overwriting like the tests do, but w/e
	 * It wasn't in the spec :/
	 */
	public nextTurn(row: number, col: number) {
		if (this.getFieldValue(row, col)) throw new Error("Invalid move!");
		else this.state |= (0b1000000 ** row * 0b100 ** col) << (this.turn++ & 1);
	}

	public isFinished() {
		return this.getWinner() !== null || this.noMoreTurns();
	}

	public getWinner() {
		if (XWinners.some(checkWinner, this)) return "x";
		else if (OWinners.some(checkWinner, this)) return "o";
		else return null;
	}

	public noMoreTurns() {
		return this.turn === 9;
	}

	public isDraw() {
		return this.noMoreTurns() && !this.getWinner();
	}

	public getFieldValue(row: number, col: number) {
		const o = 0b1000000 ** row * 0b100 ** col;
		const x = o << 1;

		switch (this.state & (o | x)) {
			case o:
				return "o";
			case x:
				return "x";
			default:
				return null;
		}
	}
}

export = TicTacToe;
