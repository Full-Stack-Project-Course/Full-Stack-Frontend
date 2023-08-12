import { Component, OnInit } from '@angular/core';
import { ShopServiceService } from '../shop-service.service';
import { product } from 'src/app/shared/models/Product';
import { Brands } from 'src/app/shared/models/Brands';
import { Type } from 'src/app/shared/models/Types';
import { ShopParams } from 'src/app/shared/models/ShopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products!:product[]
  brands!:Brands[]
  types!:Type[]
  shopParams:ShopParams = new ShopParams()
  totalCount:number = 0
  sortByOptions = [
    {name:"Alphapteical" , value : "name"},
    {name:"Price from Low : High" , value : "priceAsc"},
    {name:"Price from High : Low" , value : "priceDesc"}
  ]
  constructor(private shopService:ShopServiceService) {}
  ngOnInit(): void {
    this.getProducts()
    this.getBrands()
    this.getTypes()
  }

  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe({
      next : res => {
        this.products =  res.data
        this.totalCount = res.count
        this.shopParams.pageNumber = res.pageIndex
        this.shopParams.pageSize = res.pageSize
      } ,
      error: console.error,
      complete : () => {
        console.log("Done Requesting Data")
        console.log("Awaiting more comamdns")
      }
    })
  }

  getTypes(){
    this.shopService.getTypes().subscribe({
      next : res => this.types = [{id:0 , name:"All"} , ...res] ,
      error: console.error,
      complete : () => {
        console.log("Done Requesting Data")
        console.log("Awaiting more comamdns")
      }
    })
  }

  getBrands(){
    this.shopService.getBrands().subscribe({
      next : res => this.brands = [{id:0 , name:"All"} , ...res] ,
      error: console.error,
      complete : () => {
        console.log("Done Requesting Data")
        console.log("Awaiting more comamdns")
      }
    })
  }

  onBrandSelected(brandID:number){
    this.shopParams.brandID = brandID
    this.getProducts()
  }

  onTypeSelected(typeID:number){
    this.shopParams.TypeID = typeID
    this.getProducts()
  }

  onSortingSelected(event:any){
    this.shopParams.sortBy = event.target.value

    this.getProducts();
  }

  onPageChanged(event:any){
    if(this.shopParams.pageNumber != event){
      this.shopParams.pageNumber = event
      this.getProducts()
    }
  
  }

  onSearchClicked(searchtext:string){
    if(searchtext != this.shopParams.searchtext){
      this.shopParams.searchtext = searchtext
      this.getProducts()
    }
  }

  onReset(searchInput:HTMLInputElement){
    searchInput.value = ""
    this.shopParams = new ShopParams()
    this.getProducts()
  }
}
