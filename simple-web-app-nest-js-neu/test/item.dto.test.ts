import 'reflect-metadata';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ItemDto } from '../src/item.dto';

describe('ItemDto', () => {
  it('should reject invalid name', async () => {
    const input = {
      name: 123, // not a string
      packageType: 'COOLING_PACKAGE',
      shippingDate: '2025-07-01T00:00:00Z',
      address: {
        street: 'A',
        city: 'B',
        postalCode: 'C',
        country: 'D',
      },
    };

    const dto: ItemDto = plainToInstance(ItemDto, input);
    const errors: ValidationError[] = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should accept valid input', async () => {
    const input = {
      name: 'Milk',
      packageType: 'COOLING_PACKAGE',
      shippingDate: '2025-07-01T00:00:00Z',
      expirationDate: '2025-07-10T00:00:00Z',
      address: {
        street: 'A',
        city: 'B',
        postalCode: 'C',
        country: 'D',
      },
    };

    const dto: ItemDto = plainToInstance(ItemDto, input);
    const errors: ValidationError[] = await validate(dto);
    expect(errors.length).toBe(0); //
  });

  it('should reject invalid expirationDate', async () => {
    const input = {
      name: 'Milk',
      packageType: 'COOLING_PACKAGE',
      shippingDate: '2025-07-01T00:00:00Z',
      expirationDate: '2025-07-06T00:00:00Z',
      address: {
        street: 'A',
        city: 'B',
        postalCode: 'C',
        country: 'D',
      },
    };

    const dto: ItemDto = plainToInstance(ItemDto, input);
    const errors: ValidationError[] = await validate(dto);
    expect(errors.length).toBe(1);
  });

  it('should reject incomplete item', async () => {
    const input = {
      // name is missing
      packageType: 'COOLING_PACKAGE',
      shippingDate: '2025-07-01T00:00:00Z',
      address: {
        street: 'A',
        city: 'B',
        postalCode: 'C',
        country: 'D',
      },
    };

    const dto: ItemDto = plainToInstance(ItemDto, input);
    const errors: ValidationError[] = await validate(dto);
    expect(errors.length).toBe(1);
  });

  it('should reject item with incomplete address', async () => {
    const input = {
      name: 'Milk',
      packageType: 'COOLING_PACKAGE',
      shippingDate: '2025-07-01T00:00:00Z',
      address: {
        street: 'A',
        // city is missing
        postalCode: 'C',
        country: 'D',
      },
    };

    const dto: ItemDto = plainToInstance(ItemDto, input);
    const errors: ValidationError[] = await validate(dto);
    expect(errors.length).toBe(1);
  });
});
