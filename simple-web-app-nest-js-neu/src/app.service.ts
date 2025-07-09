import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemDto } from './item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Item, ItemDocument } from './item.schema';
import { DeleteResult, Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}

  async getAllItems(): Promise<Item[]> {
    return this.itemModel.find().exec();
  }

  async getItem(name: string): Promise<Item> {
    const result = await this.itemModel.findOne({ name }).exec();

    if (result == null) {
      throw new NotFoundException(`Item with name ${name} not found`);
    }
    return result;
  }

  async addItem(item: ItemDto): Promise<Item> {
    const newItem = new this.itemModel(item);
    return newItem.save();
  }

  async deleteItem(_id: string): Promise<DeleteResult> {
    return this.itemModel.deleteOne({ _id }).exec();
  }
}
