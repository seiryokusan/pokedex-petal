import { DebugElement } from "@angular/core";
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { Pokemon } from "pokenode-ts";
import { RouterLinkDirectiveStub } from "src/utils/unit-tests/router-link-directive-stub";
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

    let linkEvolutions: DebugElement[];
    let routerLinksEvolutions: RouterLinkDirectiveStub[];

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
        spyGetPokemonByName = spyOn(component.pokemonClient, "getPokemonByName").and.callFake((name) => {
            if (name === "spearow") {
                return {
                    id: 21,
                    name: "Spearow",
                    sprites: {
                        front_default: "",
                    },
                } as Pokemon;
            }
            return pokemonTestData as any;
        });
        spyGetPokemonSpeciesByName = spyOn(component.pokemonClient, "getPokemonSpeciesByName").and.resolveTo(
            pokemonSpeciesTestData as any
        );
        spyGetResourceByUrl = spyOn(component.utilityClient, "getResourceByUrl").and.resolveTo(
            evolutionChainTestData as any
        );

        linkEvolutions = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
        routerLinksEvolutions = linkEvolutions.map((de) => de.injector.get(RouterLinkDirectiveStub));
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("Sets the selected pokemon from the client", (done) => {
        component.ngOnInit();
        spyGetPokemonById.calls.mostRecent().returnValue.then(() => {
            expect(component.selectedPokemon).toEqual(pokemonTestData as any);
            expect(component.pokemonNumberDisplay).toEqual("#022");
            done();
        });
    });

    it("Displays the selected pokemon to the user", (done) => {
        component.ngOnInit();
        spyGetPokemonById.calls.mostRecent().returnValue.then(() => {
            fixture.detectChanges();

            const nameEntryEl = (fixture.nativeElement as HTMLElement).querySelector(".entry-container .entry-name");
            expect(nameEntryEl?.innerHTML).toContain(
                pokemonTestData.name.substr(0, 1).toUpperCase() + pokemonTestData.name.substr(1)
            );

            const numberEl = (fixture.nativeElement as HTMLElement).querySelector(".entry-number");
            expect(numberEl?.innerHTML).toEqual("#022");

            done();
        });
    });

    it("Displays the evolution chain to the user", async () => {
        await component.ngOnInit();
        fixture.detectChanges();
        await spyGetResourceByUrl.calls.mostRecent().returnValue;

        fixture.detectChanges();

        const spriteNameEl = (fixture.nativeElement as HTMLElement).querySelectorAll(".evolution .chain .sprite-name");
        expect(spriteNameEl.length).toBe(2);
        expect(spriteNameEl[0].textContent).toContain("Spearow");
        expect(spriteNameEl[1].textContent).toContain("Fearow");

        const arrowEl = (fixture.nativeElement as HTMLElement).querySelectorAll(".evolution .arrow");
        expect(arrowEl.length).toBe(1);
    });
});
