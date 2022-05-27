import { Body, Controller, Get, Post } from '@nestjs/common';
import axios from 'axios';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post("notification")
  async notification(@Body() message: any) {
    const { data } = await axios.post('https://exp.host/--/api/v2/push/send', message, {
      headers: {

        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      }
    })

    return data;
  }
}
