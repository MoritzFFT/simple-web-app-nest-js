import { PackageType } from './app.package-type';
import { Address } from './address.dto';
export declare class ItemDto {
    name: string;
    packageType: PackageType;
    expirationDate?: string;
    address: Address;
    shippingDate: string;
}
