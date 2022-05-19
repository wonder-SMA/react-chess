// @ts-ignore
import blackLogo from '../../../assets/black-figures/bishop.png';
// @ts-ignore
import whiteLogo from '../../../assets/white-figures/bishop.png';
import CellModel from '../../Cell';
import { Colors } from '../../Colors';
import FigureModel from '../../Figure';
import { FigureNames } from '../../Figure/Figure.model';

class BishopModel extends FigureModel {
  name = FigureNames.BISHOP;

  constructor(color: Colors, cell: CellModel) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
  }

  canMove(target: CellModel): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    if (this.cell.isEmptyDiagonal(target)) {
      return true;
    }
    return false;
  }
}


export default BishopModel;