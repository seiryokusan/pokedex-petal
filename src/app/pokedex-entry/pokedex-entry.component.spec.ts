import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { RouterLinkDirectiveStub } from "src/utils/unit-tests/router-link-directive-stub";
import { pokemonTestData } from "../../utils/unit-tests/pokemon-data";

import { PokedexEntryComponent } from "./pokedex-entry.component";

describe("PokedexEntryComponent", () => {
    let component: PokedexEntryComponent;
    let fixture: ComponentFixture<PokedexEntryComponent>;

    let linkEvolutions: DebugElement[];
    let routerLinksEvolutions: RouterLinkDirectiveStub[];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PokedexEntryComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PokedexEntryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        linkEvolutions = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
        routerLinksEvolutions = linkEvolutions.map((de) => de.injector.get(RouterLinkDirectiveStub));
    });

    afterEach(() => {
        component.selectedPokemon = undefined;
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("container display text when empty", () => {
        const nameEntryEl = (fixture.nativeElement as HTMLElement).querySelector(
            ".entry-container .entry-name"
        )?.textContent;

        expect(nameEntryEl).toEqual("Choose your Pokemon!");
    });

    it("Display pokemon after binding", () => {
        component.selectedPokemon = pokemonTestData as any;
        fixture.detectChanges();

        const nameEntryEl = (fixture.nativeElement as HTMLElement).querySelector(".entry-container .entry-name");
        expect(nameEntryEl?.textContent).toEqual(pokemonTestData.name.toUpperCase());

        const numberEl = (fixture.nativeElement as HTMLElement).querySelector(".entry-number");
        expect(numberEl?.textContent).toEqual("#022");

        const typeEl = (fixture.nativeElement as HTMLElement).getElementsByClassName("type");
        expect(typeEl.length).toEqual(2);
    });
});
