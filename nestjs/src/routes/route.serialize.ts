import { Route } from ".prisma/client";
import { DirectionsResponseData } from "@googlemaps/google-maps-services-js";

export class RouteSerialize implements Omit<Route, 'directions'>{
    id: string;
    name: string;
    source: { name: string; location: { lat: number; lng: number; }};
    destination: { name: string; location: { lat: number; lng: number; }};
    distance: number;
    duration: number;
    creation_at: Date;
    updated_at: Date;
    directions: DirectionsResponseData & {request: any}

    constructor(route: Route){
        this.id = route.id;
        this.name = route.name;
        this.source = route.source;
        this.destination = route.destination;
        this.distance = route.distance;
        this.duration = route.duration;
        this.creation_at = route.creation_at;
        this.updated_at = route.updated_at;
        this.directions = JSON.parse(route.directions as string);
    }
}