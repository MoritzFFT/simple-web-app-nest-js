import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ItemDto } from './item.dto';
import { Item } from './item.schema';
import { DeleteResult } from 'mongoose';
import { BusinessLogic } from './business.logic';

@Controller('/webapp')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  retrieveAll(): Promise<Item[]> {
    return this.appService.getAllItems();
  }

  @Get(':item')
  retrieveSingleItem(@Param('item') item: string): Promise<Item> {
    return this.appService.getItem(item);
  }

  @Post()
  async addItem(@Body() itemDto: ItemDto): Promise<Item> {
    await BusinessLogic.validateAddress(itemDto.address);
    return this.appService.addItem(itemDto);
  }

  @Delete(':item')
  deleteSingleItem(@Param('item') item: string): Promise<DeleteResult> {
    return this.appService.deleteItem(item);
  }

  // get statistics => wie oft gibt es jeden Namen => {apple: [values...]
}

/*
curl -X POST http://localhost:3000/webapp -H "Content-Type: application/json" -d '{"name": "Apple", "value": 10}'
 */
