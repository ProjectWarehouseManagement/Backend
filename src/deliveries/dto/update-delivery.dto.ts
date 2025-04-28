import { PartialType } from '@nestjs/swagger';
import { CreateDeliveryDetailsDto, CreateDeliveryDto } from './create-delivery.dto';

export class UpdateDeliveryDto extends PartialType(CreateDeliveryDto) {}
export class UpdateDeliveryDetailsDto extends PartialType(CreateDeliveryDetailsDto) {}