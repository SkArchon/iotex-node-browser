import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from 'src/services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("/user-login")
  async userLogin(@Body() data) {
    return await this.appService.create(data);
  }
  
}
