import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppService } from '../_services/app.service';
import { Category } from '../_models/category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

declare var $: any;


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryList:Category[];
  imageChangedEvent: any = '';
  croppedImage: any = '';
  categoryStatusFilter = '';
  categoryForm: FormGroup;
  submitted = true;
  categoryManage:string;
  categoryId: number;
  fileName:any;

  constructor(private formBuilder: FormBuilder, private appService: AppService,  private SpinnerService: NgxSpinnerService, private toastr: ToastrService, private cd: ChangeDetectorRef) {
    this.categoryForm = this.formBuilder.group({
      name_eng: ['', Validators.required],
      name_tam: ['', Validators.required],
      status: ['', Validators.required],
      image: [null] 
    });
   }


  ngOnInit() {
    this.SpinnerService.show();
    this.appService.getCategory().subscribe(res => {
      this.SpinnerService.hide();
      this.categoryList = this.appService.prepareCategory(res['payload'].product_category);
    }, err => {
      this.SpinnerService.hide();
      this.toastr.info(err, 'Error');
    });
    
  }

  editCategory(category:Category, categoryManage:string){
    this.categoryManage = categoryManage;
    this.categoryId = category.id;
    $('#categoryModal').modal('show');
    this.categoryForm.patchValue({
      name_eng: category.name_eng,
      name_tam: category.name_tam,
      status: category.status,
      image: null
    })
  }

  addCategory(categoryManage:string){
    this.categoryManage = categoryManage;
    this.categoryForm.patchValue({
      name_eng: '',
      name_tam: '',
      status: '',
      image: null
    });
    $('#categoryModal').modal('show');
  }

  get f() { return this.categoryForm.controls; }

  onSubmit() {
    if (this.categoryForm.valid) {
      this.submitted = true;
      this.SpinnerService.show();
      if(this.categoryForm.value.image === null && this.categoryManage === 'edit'){
        delete this.categoryForm.value.image;
      }
      this.appService.addEditCategory(this.toFormData(this.categoryForm.value), this.categoryManage, this.categoryId).subscribe(res =>{
        this.SpinnerService.hide();
        this.toastr.success('Product Category Added Successfully', 'Success');
        $('#categoryModal').modal('hide');
        this.ngOnInit();
      }, err=>{
        this.SpinnerService.hide();
        this.toastr.info(err, 'Error');
      });
    }  else {
      this.submitted = false;
    }
  }

  deleteConfirm(categoryId){
    this.categoryId = categoryId;
    $('#deleteCategory').modal('show');
  }

  toFormData<T>( formValue: T ) {
    const formData = new FormData();
  
    for ( const key of Object.keys(formValue) ) {
      const value = formValue[key];
      formData.append(key, value);
    }
  
    return formData;
  }

  deleteCategory(){
    this.SpinnerService.show();
    this.appService.deleteCategory(this.categoryId).subscribe(res => {
      $("#deleteCategory").modal('hide');
      this.SpinnerService.hide();
      this.toastr.success('Category deleted Successfully', 'Success');
      this.ngOnInit();
    }, err =>{
      this.SpinnerService.hide();
      this.toastr.error(err, 'Error');
    })
  }

  fileChange(event){
    this.categoryForm.patchValue({
      image: event.target.files[0]
    });
    this.fileName = event.target.files[0].name
  }
  


}
