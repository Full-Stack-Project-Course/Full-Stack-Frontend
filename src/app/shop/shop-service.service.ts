import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/Pagination';
import { product } from '../shared/models/Product';
import { Type } from '../shared/models/Types';
import { Brands } from '../shared/models/Brands';
import { ShopParams } from '../shared/models/ShopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopServiceService {

  constructor(private http:HttpClient) { }
  baseUrl = 'http://localhost:5032/api/';
  getProducts(shopParams:ShopParams){

    let params = new HttpParams()
    if(shopParams.brandID > 0) params = params.append("brandID" , shopParams.brandID)
    if(shopParams.TypeID > 0) params = params.append("typeID" , shopParams.TypeID)
    params = params.append("sortby" , shopParams.sortBy)
    params = params.append('pageSize' , shopParams.pageSize)
    params = params.append('pageIndex' , shopParams.pageNumber)
    params = params.append('search' , shopParams.searchtext)
    return this.http.get<Pagination<product>>(this.baseUrl+"Product" , {  params})
  }

  getTypes(){
    return this.http.get<Type[]>(this.baseUrl+"Product/types")
  }

  getBrands(){
    return this.http.get<Brands[]>(this.baseUrl+"Product/brands")
  }

  getProduct(id:number){
    return this.http.get<product>(this.baseUrl+"Product/"+id)
  }
}
