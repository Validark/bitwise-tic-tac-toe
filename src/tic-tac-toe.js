"use strict";
const Winners = [
    63,
    258048,
    4032,
    199728,
    49932,
    12483,
    197379,
    13104
];
const XWinners = Winners.map(n => n & 174762);
const OWinners = Winners.map(n => n & 87381);
function checkWinner(x) {
    return (this.state & x) === x;
}
/** Creates a Tick-Tack-Toe 3 in a row game.
 * X always starts first. X and O alternate placing their mark on a 3x3 matrix.
 * (0, 0) is the top left, and (2, 2) is the bottom right.
 * The order of the aforementioned points is (row, column) [See here](https://en.wikipedia.org/wiki/File:Matris.png#/media/File:Matris.png)
 */
class TicTacToe {
    constructor() {
        /** The value which holds the game's state.
         * Each pair of 0's below is an empty slot.
         * If any slot is changed to 10, it is an "x".
         * If any slot is changed to 01, it is an "o".
         *
         * The furthest right in the number is (0, 0). Next is (0, 1), (0, 2), (1, 0) and so on.
         */
        this.state = 0;
        /** The turn number, starting at 1. */
        this.turn = 1;
    }
    render() {
        console.log(this.getFieldValue(0, 0) || "-", this.getFieldValue(0, 1) || "-", this.getFieldValue(0, 2) || "-");
        console.log(this.getFieldValue(1, 0) || "-", this.getFieldValue(1, 1) || "-", this.getFieldValue(1, 2) || "-");
        console.log(this.getFieldValue(2, 0) || "-", this.getFieldValue(2, 1) || "-", this.getFieldValue(2, 2) || "-");
    }
    getCurrentPlayerSymbol() {
        return this.turn & 1 ? "x" : "o";
    }
    /** Doesn't support overwriting like the tests do, but w/e
     * It wasn't in the spec :/
     */
    nextTurn(row, col) {
        if (this.getFieldValue(row, col))
            throw new Error("Invalid move!");
        else
            this.state |= (Math.pow(0b1000000, row) * Math.pow(0b100, col)) << (this.turn++ & 1);
    }
    isFinished() {
        return this.getWinner() !== null || this.noMoreTurns();
    }
    getWinner() {
        if (XWinners.some(checkWinner, this))
            return "x";
        else if (OWinners.some(checkWinner, this))
            return "o";
        else
            return null;
    }
    noMoreTurns() {
        return this.turn === 9;
    }
    isDraw() {
        return this.noMoreTurns() && !this.getWinner();
    }
    getFieldValue(row, col) {
        const o = Math.pow(0b1000000, row) * Math.pow(0b100, col);
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
module.exports = TicTacToe;
