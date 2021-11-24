import { Component, OnInit } from "@angular/core";
import { NamedAPIResource, Pokemon, PokemonClient } from "pokenode-ts";

@Component({
    selector: "app-pokedex-main",
    templateUrl: "./pokedex-main.component.html",
    styleUrls: ["./pokedex-main.component.scss"],
})
export class PokedexMainComponent implements OnInit {
    public pokemonList: NamedAPIResource[] = [];
    public selectedPokemon?: Pokemon;
    public pagingInfo = {
        currentPage: 0,
        pageSize: 50,
        totalEntries: 0,
    };

    private pokemonClient: PokemonClient;

    constructor() {
        this.pokemonClient = new PokemonClient();
    }

    ngOnInit(): void {
        this.pokemonClient
            .listPokemons(0, 50)
            .then((data) => {
                this.pokemonList = data.results as NamedAPIResource[];
                this.pagingInfo.totalEntries = data.count;
            })
            .catch((error) => console.error(error));
    }

    onSelect(name: string): void {
        this.pokemonClient
            .getPokemonByName(name)
            .then((data) => {
                this.selectedPokemon = data;
            })
            .catch((error) => console.error(error));
    }

    onPreviousPageClick() {
        if (this.pagingInfo.currentPage === 0) {
            return;
        }
        const currentOffset =
            this.pagingInfo.pageSize * (this.pagingInfo.currentPage - 1);
        this.pokemonClient
            .listPokemons(currentOffset, this.pagingInfo.pageSize)
            .then((data) => {
                this.pokemonList = data.results as NamedAPIResource[];
                this.pagingInfo.currentPage--;
            })
            .catch((error) => console.error(error));
    }

    onNextPageClick() {
        if (
            (this.pagingInfo.currentPage + 1) * this.pagingInfo.pageSize >
            this.pagingInfo.totalEntries
        ) {
            return;
        }
        const currentOffset =
            this.pagingInfo.pageSize * (this.pagingInfo.currentPage + 1);
        this.pokemonClient
            .listPokemons(currentOffset, this.pagingInfo.pageSize)
            .then((data) => {
                this.pokemonList = data.results as NamedAPIResource[];
                this.pagingInfo.currentPage++;
            })
            .catch((error) => console.error(error));
    }
}
