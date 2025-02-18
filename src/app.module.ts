import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminsModule } from './admins/admins.module';
import { ProvidersModule } from './providers/providers.module';

@Module({
  imports: [AdminsModule, ProvidersModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
