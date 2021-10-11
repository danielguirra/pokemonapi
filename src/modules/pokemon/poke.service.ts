import { Injectable } from "@nestjs/common";
import axios from "axios";
import * as fs from 'fs';
import * as pokemon from 'pokemon.js'


@Injectable()
export class PokemonService {
    async getPokemon(id: string): Promise<Pokemon> {
        pokemon.setLanguage('english')

        const poketype: string[] = JSON.parse(fs.readFileSync('./src/utils/poketype.json', 'utf8'))
        let type1
        let type2
        let poke = await pokemon.getPokemon(`${id}`)
        if (poke['types'][0]) {
            type1 = poke['types'][0]['name']
            type1 = poketype[type1]
        }
        if (poke['types'][1]) {
            type2 = poke['types'][1]['name']
            type2 = poketype[type2]
        } else {
            type2 = null
        }

        let femea
        if (!poke['sprites']['front_female']) {
            femea = null
        } else {
            femea = poke['sprites']['front_female']
        }




        const pok: Pokemon = {
            name: poke['name'],
            type1: type1,
            type2: type2,
            sprite: poke['sprites']['front_default'],
            spriteF: femea,
            shiny: poke['sprites']['front_shiny'],
            curiosity: 'batata',
            HP: poke['stats']['hp'],
            ATK: poke['stats']['attack'],
            DEF: ['stats']['defense'],
            SATK: poke['stats']['special-attack'],
            SDEF: poke['stats']['special-defense'],
            SPED: poke['stats']['speed'],
            WEIGHT: poke['weight']
        }

        return pok
    }
}