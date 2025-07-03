import { ItemDto } from './item.dto';
import { Item, ItemDocument } from './item.schema';
import { DeleteResult, Model } from 'mongoose';
export declare class AppService {
    private itemModel;
    constructor(itemModel: Model<ItemDocument>);
    getAllItems(): Promise<Item[]>;
    getItem(name: string): Promise<Item>;
    addItem(item: ItemDto): Promise<Item>;
    deleteItem(_id: string): Promise<DeleteResult>;
}
