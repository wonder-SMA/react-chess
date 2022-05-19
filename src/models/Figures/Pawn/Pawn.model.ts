// @ts-ignore
import blackLogo from '../../../assets/black-figures/pawn.png';
// @ts-ignore
import whiteLogo from '../../../assets/white-figures/pawn.png';
import CellModel from '../../Cell';
import { Colors } from '../../Colors';
import FigureModel from '../../Figure';
import { FigureNames } from '../../Figure/Figure.model';

class PawnModel extends FigureModel {
  name = FigureNames.PAWN;
  isFirstStep: boolean = true;

  constructor(color: Colors, cell: CellModel) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
  }

  canMove(target: CellModel): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
    const firstStepDirection = this.cell.figure?.color === Colors.BLACK ? 2 : -2;
    if ((target.y === this.cell.y + direction ||
        this.isFirstStep && (target.y === this.cell.y + firstStepDirection))
      && target.x === this.cell.x
      && this.cell.board.getCell(target.x, target.y).isEmpty()) {
      return true;
    }
    if (target.y === this.cell.y + direction
      && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
      && this.cell.isEnemy(target)) {
      return true;
    }
    return false;
  }

  moveFigure(target: CellModel) {
    super.moveFigure(target);
    this.isFirstStep = false;
  }
}

export default PawnModel;