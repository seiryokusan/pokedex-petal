import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PokedexMainComponent } from "./pokedex-main.component";

describe("PokedexMainComponent", () => {
    let component: PokedexMainComponent;
    let fixture: ComponentFixture<PokedexMainComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PokedexMainComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PokedexMainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
