import { Document } from 'mongoose';
export type ItemDocument = Item & Document;
export declare class Item {
    name: string;
    value: number;
}
export declare const ItemSchema: import("mongoose").Schema<Item, import("mongoose").Model<Item, any, any, any, Document<unknown, any, Item, any> & Item & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Item, Document<unknown, {}, import("mongoose").FlatRecord<Item>, {}> & import("mongoose").FlatRecord<Item> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
