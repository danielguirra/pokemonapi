import { Controller, Get, Param, Post } from "@nestjs/common";
import { PokemonService } from "./poke.service";

@Controller('pokemon')

export class PokemonController {
    constructor(private readonly service: PokemonService) { }

    @Get('/:id')
    getPokemon(@Param('id') id: string): Promise<any> {
        const pokemon = this.service.getPokemon(id)

        return pokemon
    }
}