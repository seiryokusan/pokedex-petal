import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PokedexDetailsComponent } from "./pokedex-details/pokedex-details.component";
import { PokedexMainComponent } from "./pokedex-main/pokedex-main.component";

const routes: Routes = [
    { path: "", redirectTo: "/pokedex", pathMatch: "full" },
    { path: "pokedex", component: PokedexMainComponent },
    {
        path: "pokedex/entry/:id",
        component: PokedexDetailsComponent,
        runGuardsAndResolvers: "always",
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
