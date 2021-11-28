import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { pokemonList } from "../../utils/unit-tests/pokemon-list-data";
import { PokedexEntryComponent } from "../pokedex-entry/pokedex-entry.component";
import { PokedexMainComponent } from "./pokedex-main.component";

describe("PokedexMainComponent", () => {
    let component: PokedexMainComponent;
    let fixture: ComponentFixture<PokedexMainComponent>;

    let spyGetPokemonList: jasmine.Spy;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PokedexMainComponent, PokedexEntryComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PokedexMainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        spyGetPokemonList = spyOn(component.pokemonClient, "listPokemons").and.resolveTo(pokemonList);
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    describe("The paging", () => {
        beforeEach(async () => {
            component.ngOnInit();
            await spyGetPokemonList.calls.mostRecent().returnValue;
            fixture.detectChanges();
        });

        it("should display correctly", () => {
            const nameEntryEl = (fixture.nativeElement as HTMLElement).querySelector(
                ".entry-container .entry-name"
            )?.textContent;

            expect(nameEntryEl).toEqual("Choose your Pokemon!");

            const paginationEl = (fixture.nativeElement as HTMLElement).querySelectorAll(".footer .list-display ul li");
            expect(paginationEl.length).toEqual(50);

            const paginationArrowRightEl = fixture.debugElement.query(By.css(".pagination.right"));
            const arrowRightCharacter = window
                .getComputedStyle(paginationArrowRightEl.nativeElement, "before")
                .getPropertyValue("content");

            expect(arrowRightCharacter).toEqual(`"❯"`);

            const paginationArrowLeftEl = fixture.debugElement.query(By.css(".pagination.left"));
            const arrowLeftCharacter = window
                .getComputedStyle(paginationArrowLeftEl.nativeElement, "before")
                .getPropertyValue("content");

            expect(arrowLeftCharacter).toEqual(`"❮"`);
        });

        it("should page to the right", () => {
            spyGetPokemonList.calls.reset();
            const paginationArrowRightEl = fixture.debugElement.query(By.css(".pagination.right"));
            paginationArrowRightEl.triggerEventHandler("click", null);
            fixture.detectChanges();

            expect(spyGetPokemonList).toHaveBeenCalledWith(50, 50);
        });

        it("should not page to the left when no data is available", () => {
            const paginationArrowLeftEl = fixture.debugElement.query(By.css(".pagination.left"));
            spyGetPokemonList.calls.reset();
            paginationArrowLeftEl.triggerEventHandler("click", null);
            fixture.detectChanges();

            expect(spyGetPokemonList).not.toHaveBeenCalled();
        });
    });
});
