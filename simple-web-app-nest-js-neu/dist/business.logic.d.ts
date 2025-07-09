import { Address } from './address.dto';
export declare class BusinessLogic {
    static isGermanOrAustrian(country: string): boolean;
    static validateAddress(address: Address): Promise<void>;
}
