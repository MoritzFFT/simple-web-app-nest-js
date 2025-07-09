import { Address } from './address.dto';
import axios from 'axios';
import { NotFoundException } from '@nestjs/common';

export class BusinessLogic {
  static isGermanOrAustrian(country: string) {
    const upper: string = country.toUpperCase();
    return (
      upper === 'GERMANY' ||
      upper === 'DEUTSCHLAND' ||
      upper === 'AUSTRIA' ||
      upper === 'ÖSTERREICH'
    );
  }

  static async validateAddress(address: Address) {
    if (!BusinessLogic.isGermanOrAustrian(address.country)) {
      throw new NotFoundException(
        `Currently only available in germany and austria, no shipping to ${address.country}`,
      );
    }

    // Teststrassee 1, 10115 Berlin
    console.log(address);

    const response = await axios.get(
      'https://nominatim.openstreetmap.org/search',
      {
        params: {
          q: `${address.street}, ${address.postalCode} ${address.city}`, //Wiesenerstraße 54, 12101 Berlin
          format: 'json',
          addressdetails: 1,
        },
      },
    );

    if (Array.isArray(response.data) && response.data.length === 0) {
      throw new NotFoundException(
        `Provided address does not exist: ${address.street}, ${address.postalCode} ${address.city}`,
      );
    }
  }
}
