import { Module } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [InventoriesService],
  exports: [InventoriesService]
})
export class InventoriesModule {}
