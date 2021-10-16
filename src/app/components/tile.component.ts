import { Component, Input } from '@angular/core';
import { Tiletype } from '../types';
@Component({
    selector: 'app-tile',
    templateUrl: './tile.component.html',
    styleUrls: ['./tile.component.css']
})
export class TileComponent {
    @Input() tileType: Tiletype;
    @Input() highlight: boolean;
    get tileIcon(): string {
        if (this.tileType === Tiletype.circle) {
            return 'assets/circle.png';
        } else if (this.tileType === Tiletype.cross) {
            return 'assets/cross.png';
        } else {
            return 'assets/transparent.png';
        }
    }
}
