import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { WarehousesModule } from './warehouses/warehouses.module';
import { AddressesModule } from './addresses/addresses.module';
import { InventoriesModule } from './inventories/inventories.module';
import { OrdersModule } from './orders/orders.module';
import { DeliveriesModule } from './deliveries/deliveries.module';

@Module({
  imports: [
  ConfigModule.forRoot({
    isGlobal: true,
  }),
    AuthModule, ProductsModule, UsersModule, WarehousesModule, AddressesModule, InventoriesModule, OrdersModule, DeliveriesModule, AddressesModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
