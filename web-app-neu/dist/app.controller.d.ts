import { AppService } from './app.service';
import { ItemDto } from './item.dto';
import { Item } from './item.schema';
import { DeleteResult } from 'mongoose';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    retrieveAll(): Promise<Item[]>;
    retrieveSingleItem(item: string): Promise<Item>;
    addItem(itemDto: ItemDto): Promise<Item>;
    deleteSingleItem(item: string): Promise<DeleteResult>;
}
