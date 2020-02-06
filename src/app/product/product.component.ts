import { Component, OnInit } from '@angular/core';
import { Product } from '../_models/product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../_services/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../_models/category';

declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productList:Product[];
  categoryList: Category[];
  productForm: FormGroup;
  submitted = true;
  productManage:string;
  productId: number;
  fileName:any;
  productName:string;
  productCategoryFilter = 0;


  constructor(private formBuilder: FormBuilder, private appService: AppService,  private SpinnerService: NgxSpinnerService, private toastr: ToastrService) {
    this.productForm = this.formBuilder.group({
      name_eng: ['', Validators.required],
      name_tam: ['', Validators.required],
      is_fav: ['', Validators.required],
      status: ['', Validators.required],
      image: [null], 
      category_id: ['', Validators.required],
      unit: ['', Validators.required],
      description: [''],
      stock: ['', Validators.required],
      mrp_price: ['', Validators.required],
      offer_price: ['', Validators.required],
      payment_mode: ['Cash on Delivery'],
      product_notes: ['']
      
    });
   }


  ngOnInit() {
    this.SpinnerService.show();
    this.appService.getProduct().subscribe(res => {
      this.SpinnerService.hide();
      this.productList = this.appService.prepareProduct(res['payload'].product);
      const test = this.productList.filter(prod=> prod.category_id === 1)
      console.log(test);
    }, err => {
      this.SpinnerService.hide();
      this.toastr.info(err, 'Error');
    });
    this.appService.getCategory().subscribe(res => {
      this.SpinnerService.hide();
      this.categoryList = this.appService.prepareCategory(res['payload'].product_category);
    }, err => {
      this.SpinnerService.hide();
      this.toastr.info(err, 'Error');
    });
    
  }

  onChangeFilter(val:number){
    console.log(val);
    const test = this.productList.filter(prod=> prod.category_id === Number(val))
    console.log(test);
  }

  toFormData<T>( formValue: T ) {
    const formData = new FormData();
  
    for ( const key of Object.keys(formValue) ) {
      const value = formValue[key];
      formData.append(key, value);
    }
  
    return formData;
  }

  editProduct(product:Product, productManage:string){
    this.productManage = productManage;
    this.productId = product.id;
    this.productName = product.name_eng;
    $('#productModal').modal('show');
    this.productForm.patchValue({
      name_eng: product.name_eng,
      name_tam: product.name_tam,
      is_fav: product.is_fav,
      status: product.status,
      image: null, 
      category_id: product.category_id,
      unit: product.unit,
      description: product.description,
      stock: product.stock,
      mrp_price: product.mrp_price,
      offer_price: product.offer_price,
      payment_mode: 'Cash on Delivery',
      product_notes: product.notes
    })
    this.findInvalidControls();
  }

  addProduct(productManage:string){
    this.submitted = true;
    this.productManage = productManage;
    this.productForm.patchValue({
      name_eng: '',
      name_tam: '',
      is_fav: '',
      status: '',
      image: '', 
      category_id: '',
      unit: '',
      description: '',
      stock: '',
      mrp_price: '',
      offer_price: '',
      payment_mode: 'Cash on Delivery',
      product_notes: '',
    });
    $('#productModal').modal('show');
  }

  get f() { return this.productForm.controls; }

  modalClose(){
    //this.submitted = false;
    $("#productModal").modal('hide');
  }

  onSubmit() {
    if (this.productForm.valid) { 
      this.submitted = true;
      this.SpinnerService.show();
      if(this.productForm.value.image === null || this.productForm.value.image === undefined || this.productForm.value.image === ''){
        delete this.productForm.value.image;
      }
      if(this.productForm.value.name_eng === this.productName && this.productManage === 'edit'){
        delete this.productForm.value.name_eng;
      }
      if(this.productForm.value.description === null){
        delete this.productForm.value.description;
      }
      this.appService.addEditProduct(this.toFormData(this.productForm.value), this.productManage, this.productId).subscribe(res =>{
        this.productForm.reset();
        this.SpinnerService.hide();
        this.toastr.success('Product Added Successfully', 'Success');
        $('#productModal').modal('hide');
        this.ngOnInit();
      }, err=>{
        this.SpinnerService.hide();
        this.toastr.info(err, 'Error');
      });
    }  else {
      this.submitted = false;
    }
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.productForm.controls;
    for (const name in controls) {
        if (controls['name_eng'].invalid) {
            invalid.push(name);
        }
    }
    return invalid;
}


  getDirtyValues(cg: FormGroup) {
    const dirtyValues = {};
    Object.keys(cg.controls).forEach(c => {
      const currentControl = cg.get(c);
  
      if (currentControl.dirty) {
        dirtyValues[c] = currentControl.value;
      }
    });
    return dirtyValues;
  }

  deleteProduct(){
    this.SpinnerService.show();
    $('#deleteProduct').modal('hide');
    this.appService.deleteProduct(this.productId).subscribe(res => {
      this.SpinnerService.hide();
      this.toastr.success('Product deleted Successfully', 'Success');
      this.ngOnInit();
    }, err =>{
      this.SpinnerService.hide();
      this.toastr.error(err, 'Error');
    })
  }

  deleteConfirm(productId){
    this.productId = productId;
    $('#deleteProduct').modal('show');
  }

  fileChange(event){
    this.productForm.patchValue({
      image: event.target.files[0]
    });
    this.fileName = event.target.files[0].name
  }

}
