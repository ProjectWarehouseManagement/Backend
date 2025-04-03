import { Module } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { WarehousesController } from './warehouses.controller';
import { AddressesModule } from 'src/addresses/addresses.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { InventoriesModule } from 'src/inventories/inventories.module';

@Module({
  imports: [PrismaModule, AddressesModule, InventoriesModule],
  controllers: [WarehousesController],
  providers: [WarehousesService],
})
export class WarehousesModule {}
