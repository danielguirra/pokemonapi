import { Injectable } from "@nestjs/common";
import axios from "axios";
import * as fs from 'fs';
import * as pokemon from 'pokemon.js'
import { JSDOM } from 'jsdom'


@Injectable()
export class PokemonService {
    async getPokemon(id: string): Promise<Pokemon> {

        pokemon.setLanguage('english')

        const url = `https://www.pokemon.com/br/pokedex/${id}`
        const response = await axios.get(url)
        const dom = new JSDOM(response.data)
        let curiosity = dom.window.document.querySelector("p").textContent.trim();
        let type1
        let type2
        let poke = await pokemon.getPokemon(`${id}`)
        if (poke['types'][0]) {
            type1 = poke['types'][0]['name']
        }

        let sprit: PokemonSprite
        if (!poke['sprites']['front_female']) {
            sprit = {
                sprite_normal: poke['sprites']['front_default'],
                sprite_shiny: poke['sprites']['front_shiny'],
            }
        } else {
            sprit = {
                sprite_normal: poke['sprites']['front_default'],
                sprite_female: poke['sprites']['front_female'],
                sprite_shiny: poke['sprites']['front_shiny'],
            }
        }
        let type: string[] = []
        type.push(type1)
        if (poke['types'][1]) {
            type2 = poke['types'][1]['name']
            type.push(type2)
        }

        let statu: PokemonStatus = {
            HP: poke['stats']['hp'],
            ATK: poke['stats']['attack'],
            DEF: ['stats']['defense'],
            SATK: poke['stats']['special-attack'],
            SDEF: poke['stats']['special-defense'],
            SPED: poke['stats']['speed'],
            WEIGHT: poke['weight']
        }

        const pok: Pokemon = {
            name: poke['name'],
            type: type,
            gender_rate: poke['gender_rate'],
            baby: poke['is_baby'],
            mythical: poke['is_mythical'],
            legendary: poke['is_legendary'],
            curiosity: curiosity.trim(),
            sprite: sprit,
            status: statu

        }

        return pok
    }


}