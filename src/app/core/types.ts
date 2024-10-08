export interface RegionObject{
  id:number,
  name:string
}

export interface CityObject{
      id: number,
      name: string,
      region_id: number
    }

export interface FiletersObject{
regions:string[],
price_range:string[],
area:string[],
bedroom:""
}
export interface Agent{
  id: Number,
  name: string,
  surname: string,
  avatar: string
}

export interface AddedAgent{
name:string,
phone:string, 
avatar:string,
email:string,
surname:string
}

export interface ListingObject{
  address: string,
  zip_code: string,
  city_id: number,  
  price: string,
  bedrooms: string,
  area: string,
  description: string,
  agent_id: number,
  is_rental: string,
  image: string,
  
  region_id: number,
  
}