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
region:string[],
price_range:string[],
area:string[],
bedrooms:""
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
  city_id: string,  
  price: string,
  bedrooms: string,
  area: string,
  description: string,
  agent_id: string,
  is_rental: string,
  image: string,
  
  region_id: number,
  
}

export interface ReceivedListingObject{
  address: string,
area:number,
bedrooms:number,
city:{id:number, name:string, region_id:number, region:{id:number, name:string}},
city_id:number,
id:number
image:string
is_rental:number
price:number
zip_code:string
}

export interface FetchedListingObject extends ReceivedListingObject{
 description:string, 
 created_at:string,
 agent:{avatar:string, email:string, id:number, name:string, phone:string, surname:string}
  }

  export const defaultReceivedObject: FetchedListingObject = {
    address: '',
    area: 0,
    bedrooms: 0,
    city: {
      id: 0,
      name: '',
      region_id: 0,
      region: {
        id: 0,
        name: ''
      }
    },
    city_id: 0,
    id: 0,
    image: '',
    is_rental: 0,
    price: 0,
    zip_code: '',
    created_at: '', 
    description:'',
    agent:{avatar:'', email:'', id:0, name:'', phone:'', surname:''}
  };