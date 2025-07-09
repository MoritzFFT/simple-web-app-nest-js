import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ItemDto } from './item.dto';

@ValidatorConstraint({ name: 'IsValidExpiration', async: false })
export class IsValidExpirationConstraint
  implements ValidatorConstraintInterface
{
  validate(_: any, args: ValidationArguments): boolean {
    const obj = args.object as ItemDto;

    if (!obj.expirationDate) return false;

    const expiration = new Date(obj.expirationDate);
    const shipping = new Date(obj.shippingDate);

    if (!obj.expirationDate || !obj.shippingDate) return true; // true => Fehler

    const diffMs: number = expiration.getTime() - shipping.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    return diffDays >= 7; // auch hier => true => Fehler
  }

  defaultMessage(): string {
    return 'expirationDate must be at least 7 days after shippingDate';
  }
}

// quasi @interface (also annotation) aus Java => Dann die Klasse auch ähnlich wie Java Jarkarta Validations
export function IsValidExpiration(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidExpirationConstraint,
    });
  };
}
