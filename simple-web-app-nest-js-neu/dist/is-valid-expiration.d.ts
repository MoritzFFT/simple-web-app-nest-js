import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare class IsValidExpirationConstraint implements ValidatorConstraintInterface {
    validate(_: any, args: ValidationArguments): boolean;
    defaultMessage(): string;
}
export declare function IsValidExpiration(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
