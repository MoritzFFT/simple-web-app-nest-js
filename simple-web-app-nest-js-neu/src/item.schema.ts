import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PackageType } from './app.package-type';
export type ItemDocument = Item & Document;

@Schema()
class Address {
  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  postalCode: string;

  @Prop({ required: true })
  country: string;
}

@Schema()
export class Item extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ enum: PackageType, required: true })
  packageType: PackageType;

  @Prop({})
  expirationDate?: Date;

  @Prop({ type: Address, required: true })
  address: Address;

  @Prop({ required: true })
  shippingDate: Date;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
