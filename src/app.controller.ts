import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('home')
  async home(){
    let barrios = await this.appService.getBarrios();
    let restaurantes = await this.appService.getRestaurantes();
    let hoteles = await this.appService.getHoteles();

    return { 
      barrios: encodeURIComponent(JSON.stringify(barrios)), 
      restaurantes: encodeURIComponent(JSON.stringify(restaurantes)), 
      hoteles: encodeURIComponent(JSON.stringify(hoteles)) }
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
