import { PokemonType } from "pokenode-ts";

export class PokemonUtils {
    /** Converts the actual number to the display string '#000' */
    public static pokemonNumberDisplay(id: number): string {
        const numberSign = "#";
        const numberWithPadding = "000" + id.toString();
        return numberSign + numberWithPadding.slice(-3);
    }

    /** Return the list of the pokemon's types. */
    public static pokemonTypesNames(types: PokemonType[]): string[] {
        return types
            .map((pokemonType) => pokemonType.type)
            .map((type) => type.name);
    }
}
