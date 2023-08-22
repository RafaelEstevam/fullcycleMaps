import { Controller, Query, Get } from '@nestjs/common';
import { DirectionsService } from './directions.service';

@Controller('directions')
export class DirectionsController {

    constructor(private directionsServices: DirectionsService){

    }

    @Get()
    getDirections(
        @Query('originId') originId: string,
        @Query('destinationId') destinationId: string
    ){
        return this.directionsServices.getDirections(originId, destinationId);
    }
}
