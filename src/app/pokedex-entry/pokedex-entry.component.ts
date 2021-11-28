import { Component, Input, OnInit } from "@angular/core";
import { Pokemon } from "pokenode-ts";
import { PokemonUtils } from "src/utils/pokemon-utils";

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
        return PokemonUtils.pokemonTypesNames(
            this.selectedPokemon?.types || []
        );
    }

    get pokemonNumberDisplay(): string {
        return PokemonUtils.pokemonNumberDisplay(this.selectedPokemon?.id || 0);
    }
}
