import blackLogo from '../../../assets/black-figures/king.png';
import whiteLogo from '../../../assets/white-figures/king.png';
import CellModel from '../../Cell';
import { Colors } from '../../Colors';
import FigureModel from '../../Figure';
import { FigureNames } from '../../Figure/Figure.model';

class KingModel extends FigureModel {
  name = FigureNames.KING;

  constructor(color: Colors, cell: CellModel) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
  }

  canMove(target: CellModel): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    if (((Math.abs(target.y - this.cell.y) === 1
          && Math.abs(target.x - this.cell.x) === 1)
        || (Math.abs(target.y - this.cell.y) === 1
          && target.x - this.cell.x === 0)
        || (Math.abs(target.x - this.cell.x) === 1
          && target.y - this.cell.y === 0))
      && target.figure?.name !== 'King') {
      for (let i = 0; i < this.cell.board.cells.length; i++) {
        const row = this.cell.board.cells[i];
        for (let j = 0; j < row.length; j++) {
          const cell = row[j];
          if (cell.figure?.color !== this.color && cell.figure?.canMove(target)) {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  }
}

export default KingModel;