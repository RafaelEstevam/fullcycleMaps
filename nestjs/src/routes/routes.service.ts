import { Inject, Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DirectionsService } from 'src/maps/directions/directions.service';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class RoutesService {

  constructor(
    private prismaService: PrismaService,
    private directionsService: DirectionsService,
    @Inject('KAFKA_SERVICE')
    private kafkaService: ClientKafka
  ) {}

  async create(createRouteDto: CreateRouteDto) {

    console.log(createRouteDto);

    const directions = await this.directionsService.getDirections(createRouteDto.source_id, createRouteDto.destination_id)
    const {available_travel_modes, geocoded_waypoints, request, routes} = directions;
    const legs = routes[0].legs[0]

    console.log(directions);

    const routeCreated = this.prismaService.route.create({
      data:{
        name: createRouteDto.name,
        source: {
          name: legs.start_address,
          location: {
            lat: legs.start_location.lat,
            lng: legs.start_location.lng
          }
        },
        destination: {
          name: legs.end_address,
          location: {
            lat: legs.end_location.lat,
            lng: legs.end_location.lng
          }
        },
        distance: legs.distance.value,
        duration: legs.duration.value,
        directions: JSON.stringify({
          available_travel_modes, geocoded_waypoints, request, routes
        })
      }
    })

    return routeCreated;

    // await this.kafkaService.emit('route', {
    //   event: 'RouteCreated',
    //   id: routeCreated.id,
    //   name: routeCreated.name,
    //   distance: routeCreated.distance
    // })

    // return routeCreated;

  }

  findAll() {
    return this.prismaService.route.findMany();
  }

  findOne(id: string) {
    return this.prismaService.route.findUniqueOrThrow({
      where: {id}
    });
  }

  update(id: number, updateRouteDto: UpdateRouteDto) {
    return `This action updates a #${id} route`;
  }

  remove(id: number) {
    return `This action removes a #${id} route`;
  }
}
