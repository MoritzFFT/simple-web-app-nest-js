import { IsString } from 'class-validator';

export class Address {
  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
  postalCode: string;

  @IsString()
  country: string;

  // tests: input auch explizit vom type sein, also validieren, dass da nix anderes reinkommt => sicher vor injections oder so
  // genaue Fehlermeldung prüfen und nicht nur, dass Fehler existieren
  // witz bei antwort mitgeben über api call
  // selbst: packages einrichten
}
