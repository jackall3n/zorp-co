import { Body, Controller, Get, Post } from '@nestjs/common';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';

import { AppService } from './app.service';

const prisma = new PrismaClient()

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
    await prisma.notification.create({
      data: {
        title: message.title,
        body: message.body,
        recipients: {
          createMany: {
            data: [{
              token: message.to
            }]
          }
        }
      }
    })

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
