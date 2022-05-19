import CellModel from '../Cell';
import { Colors } from '../Colors';
// @ts-ignore
import logo from '../../assets/black-figures/king.png';

export enum FigureNames {
  FIGURE = 'Figure',
  KING = 'King',
  KNIGHT = 'Knight',
  PAWN = 'Pawn',
  QUEEN = 'Queen',
  ROOK = 'Rook',
  BISHOP = 'Bishop'
}

class FigureModel {
  color: Colors;
  cell: CellModel;
  logo: typeof logo | null = null;
  name: FigureNames = FigureNames.FIGURE;
  id: number;

  constructor(color: Colors, cell: CellModel) {
    this.color = color;
    this.cell = cell;
    this.cell.figure = this;
    this.id = Math.random();
  }

  canMove(target: CellModel): boolean {
    if (target.figure?.color === this.color) {
      return false;
    }
    if (target.figure?.name === FigureNames.KING) {
      return false;
    }
    return true;
  }

  moveFigure(target: CellModel) {}
}

export default FigureModel;