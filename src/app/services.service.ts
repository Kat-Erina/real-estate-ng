import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CityObject, RegionObject } from "./types";

@Injectable({'providedIn':"root"})
export class Service{
httpRequest=inject(HttpClient)
myToken='9d21d719-0787-4dc4-b20d-a1e819ada6b4';
api='https://api.real-estate-manager.redberryinternship.ge/api/'


fetchData(param:string){
let newApi=this.api+param
return this.httpRequest.get<CityObject[]>(newApi)
}

fetchDataWithToken(param:string, token: string){
    let headers=new HttpHeaders().set('Authorization', `Bearer ${token}`)
    let newApi=this.api+param;
    return this.httpRequest.get(newApi,{headers} )
}

}