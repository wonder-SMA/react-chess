import CellModel from '../Cell';
import { Colors } from '../Colors';
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

  constructor(color: Colors, cell: CellModel) {
    this.color = color;
    this.cell = cell;
    this.cell.figure = this;
  }

  canMove(target: CellModel | null): boolean {
    return target?.figure?.color !== this.color;
  }

  moveFigure(target: CellModel) {}
}

export default FigureModel;