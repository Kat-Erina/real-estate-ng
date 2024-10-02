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