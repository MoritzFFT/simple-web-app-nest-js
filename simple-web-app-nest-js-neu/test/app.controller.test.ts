import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { ItemDto } from '../src/item.dto';
import { Item } from '../src/item.schema';
import { PackageType } from '../src/app.package-type';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const mockAppService = {
      getAllItems: jest // bei Aufruf von getAllItems
        .fn() // wird jest function erzeugen, die Dummy-Werte zurückgibt
        .mockResolvedValue([
          // hier
          {
            name: 'Apple',
            packageType: 'NORMAL_PACKAGE',
            shippingDate: '2025-07-01T00:00:00Z',
            address: {
              street: 'Teststraße 1',
              city: 'Berlin',
              postalCode: '10115',
              country: 'Germany',
            },
          } as unknown as Item,
        ]),
      addItem: jest.fn().mockImplementation((dto: ItemDto) => ({
        // nimmt dto entgegen und gibt id mit dto zurück
        _id: 'fakeId',
        ...dto, // ...dto => 'entpackt' alle Felder vom ItemDto
      })),
    };

    // config aufsetzen => AppService wird gemockt durch obigen Code
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: AppService, useValue: mockAppService }],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  // Start der eigentlichen Tests:

  it('should return all items', async () => {
    const result: Item[] = await appController.retrieveAll();
    expect(result).toEqual([
      {
        name: 'Apple',
        packageType: 'NORMAL_PACKAGE',
        shippingDate: '2025-07-01T00:00:00Z',
        address: {
          street: 'Teststraße 1',
          city: 'Berlin',
          postalCode: '10115',
          country: 'Germany',
        },
      },
    ]);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(appService.getAllItems).toHaveBeenCalled();
  });

  it('should add an item', async () => {
    const dto: ItemDto = {
      name: 'Banana',
      packageType: PackageType.COOLING_PACKAGE,
      shippingDate: new Date().toISOString(),
      address: {
        street: 'Teststraße 1',
        city: 'Berlin',
        postalCode: '12345',
        country: 'Germany',
      },
    };

    const result = await appController.addItem(dto);
    expect(result).toHaveProperty('_id');
    expect(result.name).toBe('Banana');
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(appService.addItem).toHaveBeenCalledWith(dto);
  });
});
