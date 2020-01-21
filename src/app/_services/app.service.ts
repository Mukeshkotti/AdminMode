import { Injectable } from "@angular/core";
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../_models/user';
import { Constants } from '../constant.component';
import { Category } from '../_models/category';
import { Product } from '../_models/product';
import { Area } from '../_models/area';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


const HttpUploadOptions = {
    headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' })
  }


@Injectable()
export class AppService {
    catImage: File;
    constructor(private dataService: DataService, private http: HttpClient){
        
    }

    getCategory(){
        return this.dataService.httpGet(Constants.SERVER_URL + Constants.CATEGORY);
    }

    addEditCategory(postData,categoryManage:string, categoryId:number){
        if(categoryManage === 'add'){
            return this.dataService.httpPost(Constants.SERVER_URL + Constants.ADD_CATEGORY, postData); 
        } else if(categoryManage === 'edit') {
            return this.dataService.httpPost(Constants.SERVER_URL + Constants.EDIT_CATEGORY + '/' + categoryId, postData); 
        }     
    }

    addEditArea(postData,areaManage:string, areaId:number){
        if(areaManage === 'add'){
            return this.dataService.httpPost(Constants.SERVER_URL + Constants.ADD_AREA, postData); 
        } else if(areaManage === 'edit') {
            return this.dataService.httpPost(Constants.SERVER_URL + Constants.EDIT_AREA + '/' + areaId, postData); 
        }     
    }

    addEditProduct(postData, productManage:string, productId:number){
        if(productManage === 'add'){
            return this.dataService.httpPost(Constants.SERVER_URL + Constants.ADD_PRODUCT, postData); 
        } else if(productManage === 'edit') {
            return this.dataService.httpPost(Constants.SERVER_URL + Constants.EDIT_PRODUCT + '/' + productId, postData); 
        } 
    }

    editCategory(postData){
        return this.dataService.httpPost(Constants.SERVER_URL + Constants.EDIT_CATEGORY, postData);
    }

    deleteCategory(categoryId){
        return this.dataService.httpGet(Constants.SERVER_URL + Constants.DELETE_CATEGORY + '/' + categoryId);
    }

    getProduct(){
        return this.dataService.httpGet(Constants.SERVER_URL + Constants.PRODUCT);
    }

    addProduct(postData){
        return this.dataService.httpPost(Constants.SERVER_URL + Constants.ADD_PRODUCT, postData);
    }

    editProduct(postData){
        return this.dataService.httpPost(Constants.SERVER_URL + Constants.EDIT_PRODUCT, postData);
    }

    deleteProduct(productId){
        return this.dataService.httpGet(Constants.SERVER_URL + Constants.DELETE_PRODUCT + '/' + productId);
    }

    getArea(){
        return this.dataService.httpGet(Constants.SERVER_URL + Constants.AREA);
    }

    addArea(postData){
        return this.dataService.httpPost(Constants.SERVER_URL + Constants.ADD_AREA, postData);
    }

    editArea(postData){
        return this.dataService.httpPost(Constants.SERVER_URL + Constants.EDIT_AREA, postData);
    }

    deleteArea(areaId){
        return this.dataService.httpGet(Constants.SERVER_URL + Constants.DELETE_AREA + '/' + areaId);
    }



    prepareCategory(response){
        const categoryList = new Array<Category>();
        for (const item of response) {
           const categoryListModel: Category = new Category();
           categoryListModel.id = item.id;
           categoryListModel.image = item.image;
           categoryListModel.name_eng = item.name_eng;
           categoryListModel.name_tam = item.name_tam;
           categoryListModel.status = item.status;
           categoryListModel.added_date = item.updated_at;
           categoryList.push(categoryListModel);
        }
        return categoryList;
    }

    prepareProduct(response){
        const productList = new Array<Product>();
        for(const item of response){
            const productListModel:Product = new Product();
            productListModel.id = item.id;
            productListModel.category_id = item.category_id;
            productListModel.description = item.description;
            productListModel.image = item.image;
            productListModel.mrp_price = item.mrp_price;
            productListModel.name_eng = item.name_eng;
            productListModel.name_tam = item.name_tam;
            productListModel.notes = item.notes;
            productListModel.offer_price = item.offer_price;
            productListModel.status = item.status;
            productListModel.stock = item.stock;
            productListModel.unit = item.unit;
            productListModel.is_fav = item.is_fav;
            productList.push(productListModel);
        }
        return productList;
    }

    prepareArea(response){
        const AreaList = new Array<Area>();
        for(let item of response){
            const AreaListModel:Area = new Area();
            AreaListModel.id = item.id;
            AreaListModel.name_eng = item.name_eng;
            AreaListModel.name_tam = item.name_tam;
            AreaListModel.delivery_charge = item.delivery_price;
            AreaListModel.status = item.status;
            AreaListModel.city = item.city;
            AreaListModel.state = item.state;
            AreaListModel.country = item.country;
            AreaList.push(AreaListModel);
        }
        return AreaList;
    }
}