import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('home')
  async home(){
    let barrios = await this.appService.getBarrios();
    return { barrios: encodeURIComponent(JSON.stringify(barrios)) }
  }

  @Get('/restaurantes')
  async getRestaurantes(){
    let restaurantes = await this.appService.getRestaurantes();
    return restaurantes
  }
  
  @Get('/hoteles')
  async getHoteles(){
    let hoteles = await this.appService.getHoteles();
    return hoteles
  }

}
