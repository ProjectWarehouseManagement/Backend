import { PartialType } from '@nestjs/swagger';
import { CreateOrderDetailsDto, CreateOrderDto, CreateProviderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
export class UpdateOrderDetailsDto extends PartialType(CreateOrderDetailsDto) {}
export class UpdateProviderDto extends PartialType(CreateProviderDto) {}
