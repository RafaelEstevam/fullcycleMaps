import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { RouteSerialize } from './route.serialize';
import { RoutesDriverService } from './routes-driver/routes-driver.service';

@Controller('routes')
export class RoutesController {
  constructor(
    private readonly routesService: RoutesService,
    private routesDriverService: RoutesDriverService
  ) {}

  @Post()
  create(@Body() createRouteDto: CreateRouteDto) {
    return this.routesService.create(createRouteDto);
  }

  @Get()
  async findAll() {
    const routes = await this.routesService.findAll()
    return routes.map( route => new RouteSerialize(route));
  }

  @Get('route/:id')
  async findOne(@Param('id') id: string) {
    const route = await this.routesService.findOne(id)
    return new RouteSerialize(route)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
    return this.routesService.update(+id, updateRouteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routesService.remove(+id);
  }

  @Post(`/driver`)
  async createOrUpdate(@Body() dto: {route_id: string, lat: number, lng: number} ){
    return this.routesDriverService.createOrUpdate(dto)
  }
}
