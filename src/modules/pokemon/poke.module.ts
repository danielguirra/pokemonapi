import { Module } from '@nestjs/common';
import { PokemonController } from './poke.controller';
import { PokemonService } from './poke.service'
@Module({
    imports: [],
    controllers: [PokemonController],
    providers: [PokemonService],
})
export class PokemonModule { }
