import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PokedexEntryComponent } from "./pokedex-entry/pokedex-entry.component";
import { PokedexMainComponent } from "./pokedex-main/pokedex-main.component";

const routes: Routes = [
    { path: '', redirectTo: '/pokedex', pathMatch: 'full' },
    { path: "pokedex", component: PokedexMainComponent },
    { path: "entry/:id", component: PokedexEntryComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
