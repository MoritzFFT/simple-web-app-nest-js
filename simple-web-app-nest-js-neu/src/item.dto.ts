import {
  IsString,
  IsEnum,
  IsDateString,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { PackageType } from './app.package-type';
import { Address } from './address.dto';
import { Type } from 'class-transformer';
import { IsValidExpiration } from './is-valid-expiration';
//import { IsValidExpiration } from './is-valid-expiration';

export class ItemDto {
  @IsString()
  name: string;

  @IsEnum(PackageType)
  packageType: PackageType;

  @IsOptional()
  @IsDateString()
  @IsValidExpiration()
  expirationDate?: string;

  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @IsDateString()
  shippingDate: string;
}
