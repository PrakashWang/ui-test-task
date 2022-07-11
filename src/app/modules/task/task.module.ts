import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomDirectiveModule } from 'src/app/common-utils/directives/custom-directive.module';
import { CustomPipeModule } from 'src/app/common-utils/pipes/pipe.module';

const route: Routes = [
  { path: '', component: TaskComponent }
]

@NgModule({
  declarations: [
    TaskComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomDirectiveModule,
    CustomPipeModule,
    RouterModule.forChild(route)
  ]
})
export class TaskModule { }
