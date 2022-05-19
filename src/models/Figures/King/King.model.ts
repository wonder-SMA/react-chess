// @ts-ignore
import blackLogo from '../../../assets/black-figures/king.png';
// @ts-ignore
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
    return true;
  }
}

export default KingModel;