import { makeAutoObservable } from 'mobx';

import BoardModel from '../models/Board';
import CellModel from '../models/Cell';
import { Colors } from '../models/Colors';
import PlayerModel from '../models/Player';

class ChessStore {
  _board: BoardModel = new BoardModel();
  _selectedCell: CellModel | null = null;
  _whitePlayer: PlayerModel = new PlayerModel(Colors.WHITE);
  _blackPlayer: PlayerModel = new PlayerModel(Colors.BLACK);
  _currentPlayer: PlayerModel = new PlayerModel(Colors.WHITE);
  _whiteKingCell: CellModel | null = null;
  _blackKingCell: CellModel | null = null;
  _isInCheck: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setBoard(board: BoardModel) {
    this._board = board;
  }

  get board(): BoardModel {
    return this._board;
  }

  setSelectedCell(cell: CellModel | null) {
    this._selectedCell = cell;
  }

  get selectedCell(): CellModel | null {
    return this._selectedCell;
  }

  get whitePlayer(): PlayerModel {
    return this._whitePlayer;
  }

  setInitialPlayer() {
    this._whitePlayer = new PlayerModel(Colors.WHITE);
    this._currentPlayer = this.whitePlayer;
  }

  get blackPlayer(): PlayerModel {
    return this._blackPlayer;
  }

  setCurrentPlayer(player: PlayerModel) {
    this._currentPlayer = player;
  }

  get currentPlayer(): PlayerModel | null {
    return this._currentPlayer;
  }

  setWhiteKingCell(cell: CellModel) {
    this._whiteKingCell = cell;
  }

  get whiteKingCell(): CellModel | null {
    return this._whiteKingCell;
  }

  setBlackKingCell(cell: CellModel) {
    this._blackKingCell = cell;
  }

  get blackKingCell(): CellModel | null {
    return this._blackKingCell;
  }

  get isInCheck(): boolean {
    return this._isInCheck;
  }

  setIsInCheck(isInCheck: boolean) {
    this._isInCheck = isInCheck;
  }
}

export default ChessStore;