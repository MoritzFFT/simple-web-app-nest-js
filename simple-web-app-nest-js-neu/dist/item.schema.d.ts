import { Document } from 'mongoose';
import { PackageType } from './app.package-type';
export type ItemDocument = Item & Document;
declare class Address {
    street: string;
    city: string;
    postalCode: string;
    country: string;
}
export declare class Item extends Document {
    name: string;
    packageType: PackageType;
    expirationDate?: Date;
    address: Address;
    shippingDate: Date;
}
export declare const ItemSchema: import("mongoose").Schema<Item, import("mongoose").Model<Item, any, any, any, Document<unknown, any, Item, any> & Item & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Item, Document<unknown, {}, import("mongoose").FlatRecord<Item>, {}> & import("mongoose").FlatRecord<Item> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export {};
