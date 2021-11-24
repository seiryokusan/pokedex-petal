import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Pokemon, PokemonClient } from "pokenode-ts";

@Component({
    selector: "app-pokedex-details",
    templateUrl: "./pokedex-details.component.html",
    styleUrls: ["./pokedex-details.component.scss"],
})
export class PokedexDetailsComponent implements OnInit {
    public selectedPokemon?: Pokemon;
    private pokemonClient: PokemonClient;

    constructor(private route: ActivatedRoute) {
        this.pokemonClient = new PokemonClient();
    }

    ngOnInit(): void {
        this.pokemonClient
            .getPokemonById(Number(this.route.snapshot.paramMap.get("id")))
            .then((data) => {
                this.selectedPokemon = data;
            })
            .catch((error) => console.error(error));
    }
}
