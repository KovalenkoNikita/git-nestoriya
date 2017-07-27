import { NgModule } from '@angular/core';
import { MdButtonModule, MdCheckboxModule, MdCardModule, MdInputModule } from '@angular/material';

@NgModule({
  imports: [MdButtonModule, MdCheckboxModule, MdCardModule, MdInputModule ],
  exports: [MdButtonModule, MdCheckboxModule, MdCardModule, MdInputModule ],
})
export class MyOwnCustomMaterialModule { }
