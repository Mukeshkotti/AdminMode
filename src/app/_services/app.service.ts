import { Injectable } from "@angular/core";
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../_models/user';
import { Constants } from '../constant.component';
import { Category } from '../_models/category';
import { Product } from '../_models/product';
import { Area } from '../_models/area';


@Injectable()
export class AppService {
    constructor(private dataService: DataService){
        
    }

    getCategory(){
        return this.dataService.httpGet(Constants.SERVER_URL + Constants.CATEGORY);
    }

    addCategory(postData){
        return this.dataService.httpPost(Constants.SERVER_URL + Constants.ADD_CATEGORY, postData);
    }

    editCategory(postData){
        return this.dataService.httpPost(Constants.SERVER_URL + Constants.EDIT_CATEGORY, postData);
    }

    deleteCategory(postData){
        return this.dataService.httpGet(Constants.SERVER_URL + Constants.DELETE_CATEGORY);
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

    deleteProduct(postData){
        return this.dataService.httpGet(Constants.SERVER_URL + Constants.DELETE_PRODUCT);
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

    deleteArea(postData){
        return this.dataService.httpGet(Constants.SERVER_URL + Constants.DELETE_AREA);
    }



    prepareCategory(response){
        const categoryList = new Array<Category>();
        for (const item of response) {
           const categoryListModel: Category = new Category();
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
            productList.push(productListModel);
        }
        return productList;
    }

    prepareArea(response){
        const AreaList = new Array<Area>();
        for(let item of response){
            const AreaListModel:Area = new Area();
            AreaListModel.name_eng = item.name_eng;
            AreaListModel.name_tam = item.name_eng;
            AreaListModel.city = item.city;
            AreaListModel.state = item.state;
            AreaListModel.country = item.country;
            AreaList.push(AreaListModel);
        }
        return AreaList;
    }
}