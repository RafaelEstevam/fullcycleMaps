import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { MapsModule } from 'src/maps/maps.module';
import { RoutesDriverService } from './routes-driver/routes-driver.service';
import { RoutesGateway } from './routes/routes.gateway';
import { BullModule } from '@nestjs/bull';
import { NewPointsConsumer } from './new-routes.comsumer';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [MapsModule, BullModule.registerQueue({ name: 'new-points' }), ClientsModule.register([
    {
      name: 'KAFKA_SERVICE',
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'nest',
          brokers: ['kafka:9092']
        },
      }
    }
  ])],
  controllers: [RoutesController],
  providers: [
    RoutesService,
    RoutesDriverService,
    RoutesGateway,
    NewPointsConsumer,
  ],
})
export class RoutesModule {}
