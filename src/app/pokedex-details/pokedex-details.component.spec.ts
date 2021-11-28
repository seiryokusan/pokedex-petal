import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { evolutionChainTestData } from "../../utils/unit-tests/evolution-chain-data";
import { pokemonTestData } from "../../utils/unit-tests/pokemon-data";
import { pokemonSpeciesTestData } from "../../utils/unit-tests/pokemon-species-data";
import { PokedexMainComponent } from "../pokedex-main/pokedex-main.component";
import { PokedexDetailsComponent } from "./pokedex-details.component";

describe("PokedexDetailsComponent", () => {
    let component: PokedexDetailsComponent;
    let fixture: ComponentFixture<PokedexDetailsComponent>;

    let spyGetPokemonById: jasmine.Spy;
    let spyGetPokemonByName: jasmine.Spy;
    let spyGetPokemonSpeciesByName: jasmine.Spy;
    let spyGetResourceByUrl: jasmine.Spy;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PokedexDetailsComponent],
            imports: [
                RouterTestingModule.withRoutes([
                    { path: "", redirectTo: "/pokedex", pathMatch: "full" },
                    { path: "pokedex", component: PokedexMainComponent },
                    {
                        path: "pokedex/entry/:id",
                        component: PokedexDetailsComponent,
                        runGuardsAndResolvers: "always",
                    },
                ]),
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PokedexDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        spyGetPokemonById = spyOn(component.pokemonClient, "getPokemonById").and.resolveTo(pokemonTestData as any);
        spyGetPokemonByName = spyOn(component.pokemonClient, "getPokemonByName").and.resolveTo(pokemonTestData as any);
        spyGetPokemonSpeciesByName = spyOn(component.pokemonClient, "getPokemonSpeciesByName").and.resolveTo(
            pokemonSpeciesTestData as any
        );
        spyGetResourceByUrl = spyOn(component.utilityClient, "getResourceByUrl").and.resolveTo(
            evolutionChainTestData as any
        );
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("Selected pokemon is set from the client", (done) => {
        component.ngOnInit();
        spyGetPokemonById.calls.mostRecent().returnValue.then(() => {
            expect(component.selectedPokemon).toEqual(pokemonTestData as any);
            expect(component.pokemonNumberDisplay).toEqual(pokemonTestData as any);
            done();
        });
    });
});
