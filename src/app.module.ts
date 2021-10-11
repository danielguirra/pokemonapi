import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './modules/pokemon/poke.module';

@Module({
  imports: [PokemonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
