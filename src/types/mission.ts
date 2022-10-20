export default interface Mission {
  id: number,
  picture?: string,
  status : string,
  price : number,
  title : string,
  description: string,
  creation_date : Date,
  id_create : number,
  id_make? : number
}



