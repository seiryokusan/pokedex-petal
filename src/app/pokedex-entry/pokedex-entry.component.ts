import { Component, Input, OnInit } from "@angular/core";
import { Pokemon } from "pokenode-ts";

@Component({
    selector: "app-pokedex-entry",
    templateUrl: "./pokedex-entry.component.html",
    styleUrls: ["./pokedex-entry.component.scss"],
})
export class PokedexEntryComponent implements OnInit {
    @Input() public selectedPokemon?: Pokemon;

    constructor() {}

    ngOnInit(): void {}

    get selectedPokemonTypes() {
        return this.selectedPokemon?.types
            .map((pokemonType) => pokemonType.type)
            .map((type) => type.name);
    }

    get pokemonNumberDisplay(): string {
        const numberSign = "#";
        const numberWithPadding = "000" + this.selectedPokemon?.id.toString();
        return numberSign + numberWithPadding.slice(-3);
    }
}
