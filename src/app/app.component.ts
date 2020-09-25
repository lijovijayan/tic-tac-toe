import { Component, OnInit } from '@angular/core';
import { Tiletype, ActivePlayer } from './types';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loading = false;
  matchCombos: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  activePlayer: ActivePlayer;
  activeTiles: Tiletype[] = [];
  titleMessage: string;
  playerCrossPoints = 0;
  playerCirclePoints = 0;
  ngOnInit(): void {
    for (let i = 0; i < 9; i++) {
      this.activeTiles.push(Tiletype.empty);
    }
    this.activePlayer = ActivePlayer.cross;
    this.titleMessage = 'Player 1\'s(CROSS) Move';
  }
  onTapTile(index: number): void {
    if (this.activeTiles[index] !== Tiletype.empty || this.loading) {
      return;
    }
    this.activeTiles[index] = this.activePlayer === ActivePlayer.cross ? Tiletype.cross : Tiletype.circle;
    this.checkWinner();
    this.switchPlayer();
  }
  checkWinner(): void {
    if (this.activeTiles.filter(tile => tile === Tiletype.empty).length < 5) {
      const selectedCirlceIndexes: number[] = this.getAllIndexes(Tiletype.circle);
      const selectedCrossIndexes: number[] = this.getAllIndexes(Tiletype.cross);
      if (this.checkMatchingEntries(selectedCrossIndexes)) {
        this.titleMessage = 'Player 1(CROSS) Won !';
        this.playerCrossPoints++;
        this.reset();
      } else if (this.checkMatchingEntries(selectedCirlceIndexes)) {
        this.titleMessage = 'Player 2(CIRCLE) Won !';
        this.playerCirclePoints++;
        this.reset();
      } else if ((selectedCrossIndexes.length + selectedCirlceIndexes.length) === 9) {
        this.titleMessage = 'Draw Match !';
        this.reset();
      }
    }
  }
  getAllIndexes(value): number[] {
    const indexes = [];
    for (let i = 0; i < this.activeTiles.length; i++) {
      if (this.activeTiles[i] === value) {
        indexes.push(i);
      }
    }
    return indexes;
  }
  checkMatchingEntries(entries: number[]): boolean {
    let status = false;
    this.matchCombos.forEach(combo => {
      if (entries.includes(combo[0]) && entries.includes(combo[1]) && entries.includes(combo[2])) {
        status = true;
        return false;
      }
    });
    return status;
  }
  switchPlayer(): void {
    if (this.loading) {
      return;
    } else if (this.activePlayer === ActivePlayer.cross) {
      this.activePlayer = ActivePlayer.circle;
      this.titleMessage = 'Player 2\'s(CIRCLE) Move';
    } else {
      this.activePlayer = ActivePlayer.cross;
      this.titleMessage = 'Player 1\'s(CROSS) Move';
    }
  }
  reset(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.activeTiles.forEach((_, i) => this.activeTiles[i] = Tiletype.empty);
      this.activePlayer = ActivePlayer.cross;
      this.titleMessage = 'Player 1\'s(CROSS) Move';
    }, 2000);
  }
  resetGame(): void {
    this.playerCirclePoints = 0;
    this.playerCrossPoints = 0;
    this.resetGame();
  }
}
