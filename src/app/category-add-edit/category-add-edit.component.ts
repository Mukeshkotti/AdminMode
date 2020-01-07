import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AppService } from '../_services/app.service';


@Component({
  selector: 'app-category-add-edit',
  templateUrl: './category-add-edit.component.html',
  styleUrls: ['./category-add-edit.component.scss']
})
export class CategoryAddEditComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  categoryForm: FormGroup;
  submitted = true;

  constructor(private formBuilder: FormBuilder, private appService: AppService) { }


  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      categoryNameEn: ['', Validators.required],
      categoryNameTn: ['', Validators.required],
      categoryStatus: ['', Validators.required],
      image: ['', Validators.required] 
    });
  }

  get f() { return this.categoryForm.controls; }

  onSubmit() {
    if (this.categoryForm.valid) {
      this.submitted = true;
      this.appService.addCategory(this.categoryForm.value).subscribe(res =>{

      }, err=>{

      })
    }  else {
      this.submitted = false;
    }
  }

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }
  imageLoaded() {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }

}
