import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../src/app.service';
import { Item, ItemSchema } from '../src/item.schema';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import mongoose, { DeleteResult, Model } from 'mongoose';
import { ItemDto } from '../src/item.dto';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { PackageType } from '../src/app.package-type';

describe('AppService', () => {
  let service: AppService;
  let mongodb: MongoMemoryServer;
  let itemModel: Model<Item>;

  beforeAll(async () => {
    mongodb = await MongoMemoryServer.create();
    const uri: string = mongodb.getUri();

    // config vom module mit Services und allen Sachen für db
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
      ],
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
    itemModel = module.get<Model<Item>>(getModelToken(Item.name));
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongodb.stop();
  });

  afterEach(async () => {
    await itemModel.deleteMany({});
  });

  it('should insert a new item', async () => {
    const dto: ItemDto = {
      name: 'Test Item',
      packageType: PackageType.NORMAL_PACKAGE,
      shippingDate: new Date().toISOString(),
      address: {
        street: 'Teststraße 1',
        city: 'Berlin',
        postalCode: '10115',
        country: 'Germany',
      },
    };

    const savedItem: Item = await service.addItem(dto);
    expect(savedItem).toBeDefined();
    expect(savedItem.name).toBe('Test Item');

    const found = await itemModel.findOne({ name: 'Test Item' }).exec();
    expect(found).not.toBeNull();
    expect(found?.packageType).toBe('NORMAL_PACKAGE');
  });

  it('should return all items', async () => {
    await itemModel.create([
      {
        name: 'Item 1',
        packageType: 'NORMAL_PACKAGE',
        shippingDate: new Date(),
        address: {
          street: 'A',
          city: 'B',
          postalCode: '12345',
          country: 'Germany',
        },
      },
      {
        name: 'Item 2',
        packageType: 'COOLING_PACKAGE',
        shippingDate: new Date(),
        address: {
          street: 'C',
          city: 'D',
          postalCode: '67890',
          country: 'Germany',
        },
      },
    ]);

    const result = await service.getAllItems();
    expect(result).toHaveLength(2);
  });

  it('should delete items', async () => {
    await itemModel.create([
      {
        name: 'Item 1',
        packageType: 'NORMAL_PACKAGE',
        shippingDate: new Date(),
        address: {
          street: 'A',
          city: 'B',
          postalCode: '12345',
          country: 'Germany',
        },
      },
      {
        name: 'Item 2',
        packageType: 'COOLING_PACKAGE',
        shippingDate: new Date(),
        address: {
          street: 'C',
          city: 'D',
          postalCode: '67890',
          country: 'Germany',
        },
      },
    ]);

    const items = await service.getAllItems();
    const itemToDelete: Item = items[0];

    await service.deleteItem(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-argument
      itemToDelete._id.toString(),
    );

    const result = await service.getAllItems();

    expect(result).toHaveLength(1);
  });
});
