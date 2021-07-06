import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from 'src/services/app.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post("/user-login")
  async userLogin(@Body() data, @Res({ passthrough: true }) response: Response) {
    return await this.appService.create(data, response);
  }

  @Post("/user-logout")
  userLogout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('Authorization');
  }

}
