import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PokedexMainComponent } from "./pokedex-main/pokedex-main.component";
import { PokedexEntryComponent } from "./pokedex-entry/pokedex-entry.component";
import { PokedexDetailsComponent } from "./pokedex-details/pokedex-details.component";

@NgModule({
    declarations: [
        AppComponent,
        PokedexMainComponent,
        PokedexEntryComponent,
        PokedexDetailsComponent,
    ],
    imports: [BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
