import { inject, Injectable } from "@angular/core";
import { environment } from "../../environment/environment.prod";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CityObject } from "./types";

@Injectable({'providedIn':"root"})
export class ApiService{
    httpRequest=inject(HttpClient)
    myToken=environment.MY_KEY;
    token="9e883f37-9c44-4905-90e7-4d5468724db4"
api='https://api.real-estate-manager.redberryinternship.ge/api/';

fetchData(param:string){
    let newApi=this.api+param
    return this.httpRequest.get<CityObject[]>(newApi)
    }

    fetchCities(param:string){
        let newApi=this.api+param;
        return this.httpRequest.get<CityObject[]>(newApi)
      }
      fetchDataWithToken(param:string){
        let headers=new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
        let newApi=this.api+param;
        return this.httpRequest.get<any>(newApi,{headers} )
    }
    deleteListing(listingId:string){
const newApi=this.api+'real-estates/'+listingId;
const headers=new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
return this.httpRequest.delete(newApi, {headers})
    }
    postData(param: string,  data:any){
        let newApi=this.api+param
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.token}`, 
            'accept': 'application/json',
            
          });
          return this.httpRequest.post(newApi, data, { headers })
    }
    
    
}