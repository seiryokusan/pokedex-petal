import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { ChainLink, EvolutionChain, Pokemon, PokemonClient, UtilityClient } from "pokenode-ts";
import { PokemonUtils } from "../../utils/pokemon-utils";

@Component({
    selector: "app-pokedex-details",
    templateUrl: "./pokedex-details.component.html",
    styleUrls: ["./pokedex-details.component.scss"],
})
export class PokedexDetailsComponent implements OnInit {
    public selectedPokemon?: Pokemon;
    public evolutionsPokemon?: Pokemon[];
    public pokemonClient: PokemonClient;
    public utilityClient: UtilityClient;
    public navigationSubscription;

    constructor(private router: Router, private route: ActivatedRoute) {
        this.pokemonClient = new PokemonClient();
        this.utilityClient = new UtilityClient();
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            if (e instanceof NavigationEnd) {
                this.ngOnInit();
            }
        });
    }

    async ngOnInit(): Promise<void> {
        const pokemon = await this.pokemonClient.getPokemonById(Number(this.route.snapshot.paramMap.get("id")));
        this.selectedPokemon = pokemon;

        const species = await this.pokemonClient.getPokemonSpeciesByName(pokemon.species.name);

        const chain: EvolutionChain = await this.utilityClient.getResourceByUrl(species.evolution_chain.url);
        this.evolutionsPokemon = await this.getEvolutionChainNames(chain);
    }

    ngOnDestroy() {
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
        this.selectedPokemon = undefined;
        this.evolutionsPokemon = undefined;
    }

    private recursiveEvolvesInto(evolvesInto: ChainLink[], evolutionChainNamesBuffer: string[]) {
        evolvesInto.forEach((e) => {
            evolutionChainNamesBuffer.push(e.species.name);
            if (e.evolves_to.length) {
                this.recursiveEvolvesInto(e.evolves_to, evolutionChainNamesBuffer);
            }
        });
    }

    private getPokemons(names: string[]) {
        const groupOfCalls = [];
        for (const name of names) {
            if (name === this.selectedPokemon?.name) {
                groupOfCalls.push(this.selectedPokemon);
            } else {
                groupOfCalls.push(this.pokemonClient.getPokemonByName(name));
            }
        }
        return Promise.all(groupOfCalls);
    }

    private getEvolutionChainNames(chain: EvolutionChain) {
        const evolutionChainNamesBuffer: string[] = [chain.chain.species.name || ""];
        this.recursiveEvolvesInto(chain.chain.evolves_to || [], evolutionChainNamesBuffer);
        return this.getPokemons(evolutionChainNamesBuffer);
    }

    get selectedPokemonTypes() {
        return PokemonUtils.pokemonTypesNames(this.selectedPokemon?.types || []);
    }

    get pokemonNumberDisplay(): string {
        return PokemonUtils.pokemonNumberDisplay(this.selectedPokemon?.id || 0);
    }
}
