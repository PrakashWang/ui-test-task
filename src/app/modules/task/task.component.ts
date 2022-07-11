import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { DateFormatUpdate } from 'src/app/common-utils/utils/common-functions';

export interface Employee {
  firstName: string;
  lastName: string;
  jobTitle: string;
  age: number;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  employeeList: Employee[] = [];
  @ViewChild('addEmployeeModal', { static: true }) addEmployeeModal: TemplateRef<any> | undefined;
  modal: any;
  addEmployeeForm: FormGroup = new FormGroup({});
  todayDate = DateFormatUpdate()
  isEmployeeEdit: boolean = false;
  activeIndex: number = -1;
  filterOption: any = {};
  filterModel: any = {
    name: '',
    startDate: '',
    endDate: '',
    age: '',
    jobTitle: ''
  };
  constructor() {
  }

  ngOnInit(): void {
    this.addEmployeeForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      jobTitle: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl(''),
      currentlyWorking: new FormControl(false)
    }, { validators: this.ValidateEndDate })
  }

  ValidateEndDate: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const endDateCtrl = control.get('endDate')
    const currentlyWorkingCtrl = control.get('currentlyWorking')
    if (!currentlyWorkingCtrl?.value && !endDateCtrl?.value) {
      return { required: true };
    }
    return null;
  }

  ngAfterViewInit() {
    this.modal = document.getElementById("addEmployeeModal");
  }

  openAddEmployeeModal() {
    this.modal.style.display = "block";
  }

  get getJobTitles() {
    return this.employeeList?.length ? [...new Set(this.employeeList.map(v => v.jobTitle.toLowerCase()))] : []
  }

  editEmployeeDetail(employeeDetail: Employee, index: number) {
    this.activeIndex = index;
    this.addEmployeeForm.patchValue({ ...employeeDetail });
    this.isEmployeeEdit = true;
    this.openAddEmployeeModal();
  }

  filterEmployeeList() {
    this.filterOption = Object.assign({}, this.filterModel);
  }

  clearFilter() {
    this.filterModel = {
      name: '', startDate: '', endDate: '', age: '', jobTitle: ''
    };
    this.filterOption = {};;
  }

  removeEmployeeFromList(index: number) {
    this.employeeList.splice(index, 1)
  }

  submitEmployeeDetails() {

    if (this.addEmployeeForm.invalid) {
      return;
    }

    if (this.activeIndex == -1) {
      this.employeeList.push(this.addEmployeeForm.getRawValue())
    } else {
      this.employeeList[this.activeIndex] = {
        ...this.employeeList[this.activeIndex],
        ...this.addEmployeeForm.getRawValue()
      }
    }
    this.formResetValue();
    this.closeEmployeeModal();
  }

  formResetValue() {
    this.addEmployeeForm.reset();
    this.addEmployeeForm.markAsPristine();
  }

  closeEmployeeModal() {
    this.modal.style.display = "none";
  }

}
