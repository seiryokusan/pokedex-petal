import { Component, OnInit } from "@angular/core";
import { type } from "os";
import { Pokemon, PokemonClient, Type, Types } from "pokenode-ts";

@Component({
    selector: "app-pokedex-main",
    templateUrl: "./pokedex-main.component.html",
    styleUrls: ["./pokedex-main.component.scss"],
})
export class PokedexMainComponent implements OnInit {
    public pokemonList: any[] = [];
    public selectedPokemon?: Pokemon;

    private pokemonClient: PokemonClient;

    constructor() {
        this.pokemonClient = new PokemonClient();
    }

    ngOnInit(): void {
        this.pokemonClient
            .listPokemons()
            .then((data) => {
                console.log(data);
                this.pokemonList = data.results;
            })
            .catch((error) => console.error(error));
    }

    onSelect(name: string): void {
        this.pokemonClient
            .getPokemonByName(name)
            .then((data) => {
                console.log(data);
                this.selectedPokemon = data;
            })
            .catch((error) => console.error(error));
    }

}
