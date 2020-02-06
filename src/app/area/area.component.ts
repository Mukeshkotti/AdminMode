import { Component, OnInit } from '@angular/core';
import { Area } from '../_models/area';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from '../_services/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  areaList: Area[];
  areaForm: FormGroup;
  submitted = true;
  areaManage: string;
  areaId: number;
  areaName: string;
  areaStatusFilter = '';
  modalTitle: string;
  areaDetail:Area;



  constructor(private formBuilder: FormBuilder, private appService: AppService, private SpinnerService: NgxSpinnerService, private toastr: ToastrService) {
    this.areaForm = this.formBuilder.group({
      name_eng: ['', Validators.required],
      name_tam: ['', Validators.required],
      status: ['', Validators.required],
      delivery_price: ['', Validators.required]
    });
  }


  ngOnInit() {
    this.SpinnerService.show();
    this.appService.getArea().subscribe(res => {
      this.SpinnerService.hide();
      this.areaList = this.appService.prepareArea(res['payload'].sale_area);
    }, err => {
      this.SpinnerService.hide();
      this.toastr.info(err, 'Error');
    });

  }

  editArea(area: Area, areaManage: string) {
    this.modalTitle = 'Edit Area';
    this.areaManage = areaManage;
    this.areaId = area.id;
    this.areaName = area.name_eng;
    $('#areaModal').modal('show');
    this.areaForm.patchValue({
      name_eng: area.name_eng,
      name_tam: area.name_tam,
      status: area.status,
      delivery_price: area.delivery_charge
    })
  }

  viewArea(area:Area) {
    this.areaDetail = area;
    console.log(this.areaDetail);
    $('#viewArea').modal('show');
  }

  addArea(areaManage: string) {
    this.modalTitle = 'Add Area';
    this.submitted = true;
    this.areaManage = areaManage;
    this.areaForm.patchValue({
      name_eng: '',
      name_tam: '',
      status: '', 
      delivery_price: ''
    });
    $('#areaModal').modal('show');
  }

  get f() { return this.areaForm.controls; }

  onSubmit() {
    if (this.areaForm.valid) {
      if(this.areaForm.value.name_eng === this.areaName && this.areaManage === 'edit'){
        delete this.areaForm.value.name_eng;
      }
      this.submitted = true;
      this.areaStatusFilter = '';
      this.SpinnerService.show();
      this.appService.addEditArea(this.areaForm.value, this.areaManage, this.areaId).subscribe(res => {
        this.areaForm.reset();
        this.SpinnerService.hide();
        this.toastr.success('Area Added Successfully', 'Success');
        $('#areaModal').modal('hide');
        this.ngOnInit();
      }, err => {
        this.SpinnerService.hide();
        this.toastr.info(err, 'Error');
      });
    } else {
      this.submitted = false;
    }
  }

  deleteArea(AreaId: number) {
    this.SpinnerService.show();
    this.appService.deleteArea(AreaId).subscribe(res => {
      this.SpinnerService.hide();
      this.toastr.success('Area deleted Successfully', 'Success');
      this.ngOnInit();
    }, err => {
      this.SpinnerService.hide();
      this.toastr.error(err, 'Error');
    })
  }

}
