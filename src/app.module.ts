import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminsModule } from './admins/admins.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [AdminsModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
