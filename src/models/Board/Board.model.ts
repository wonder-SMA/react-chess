import CellModel from '../Cell';
import Cell from '../Cell';
import { Colors } from '../Colors';
import Figure from '../Figure';
import BishopModel from '../Figures/Bishop';
import KingModel from '../Figures/King';
import KnightModel from '../Figures/Knight';
import PawnModel from '../Figures/Pawn';
import QueenModel from '../Figures/Queen';
import RookModel from '../Figures/Rook';


class BoardModel {
  cells: Cell[][] = [];
  lostBlackFigures: Figure[] = [];
  lostWhiteFigures: Figure[] = [];

  public initCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null)); // black cells
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null)); // white cells
        }
      }
      this.cells.push(row);
    }
  }

  public getCopyBoard(): BoardModel {
    const newBoard = new BoardModel();
    newBoard.cells = this.cells;
    newBoard.lostBlackFigures = this.lostBlackFigures;
    newBoard.lostWhiteFigures = this.lostWhiteFigures;
    return newBoard;
  }

  public highlightCells(selectedCell: CellModel | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        target.available = !!selectedCell?.figure?.canMove(target);
      }
    }
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  private addKings() {
    new KingModel(Colors.BLACK, this.getCell(4, 0));
    new KingModel(Colors.WHITE, this.getCell(4, 7));
  }

  private addKnights() {
    new KnightModel(Colors.BLACK, this.getCell(1, 0));
    new KnightModel(Colors.BLACK, this.getCell(6, 0));
    new KnightModel(Colors.WHITE, this.getCell(1, 7));
    new KnightModel(Colors.WHITE, this.getCell(6, 7));
  }

  private addPawns() {
    for (let i = 0; i < 8; i++) {
      new PawnModel(Colors.BLACK, this.getCell(i, 1));
      new PawnModel(Colors.WHITE, this.getCell(i, 6));
    }
  }

  private addQueens() {
    new QueenModel(Colors.BLACK, this.getCell(3, 0));
    new QueenModel(Colors.WHITE, this.getCell(3, 7));
  }

  private addRooks() {
    new RookModel(Colors.BLACK, this.getCell(0, 0));
    new RookModel(Colors.BLACK, this.getCell(7, 0));
    new RookModel(Colors.WHITE, this.getCell(0, 7));
    new RookModel(Colors.WHITE, this.getCell(7, 7));
  }

  private addBishops() {
    new BishopModel(Colors.BLACK, this.getCell(2, 0));
    new BishopModel(Colors.BLACK, this.getCell(5, 0));
    new BishopModel(Colors.WHITE, this.getCell(2, 7));
    new BishopModel(Colors.WHITE, this.getCell(5, 7));
  }

  public addFigure() {
    this.addKings();
    this.addKnights();
    this.addPawns();
    this.addQueens();
    this.addRooks();
    this.addBishops();
  }
}

export default BoardModel;