import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TileComponent } from './components/tile.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    TileComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
