// @ts-ignore
import blackLogo from '../../../assets/black-figures/knight.png';
// @ts-ignore
import whiteLogo from '../../../assets/white-figures/knight.png';
import CellModel from '../../Cell';
import { Colors } from '../../Colors';
import FigureModel from '../../Figure';
import { FigureNames } from '../../Figure/Figure.model';

class KnightModel extends FigureModel {
  name = FigureNames.KNIGHT;

  constructor(color: Colors, cell: CellModel) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
  }

  canMove(target: CellModel): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    const dx = Math.abs(target.x - this.cell.x);
    const dy = Math.abs(target.y - this.cell.y);
    return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
  }
}

export default KnightModel;