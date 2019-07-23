import { InputComponent } from './input/input.component';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonComponent } from './button/button.component';
import { DateComponent } from './date/date.component';
import { RadiobuttonComponent } from './radiobutton/radiobutton.component';
import { DynamicFieldDirective } from './dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { MaterialModule } from '../material.module';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SelectComponent } from './select/select.component';
import { MatGridListModule } from '@angular/material';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { TimeComponent } from './time/time.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { FileUploadComponent } from './file-upload/upload.component';
import { UploadService } from './file-upload/upload.service';
import { TextAreaComponent } from './text-area/text-area.component';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { FormTemplateComponent } from './form-template/form-template.component';

@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
    TextEditorComponent,
    TimeComponent,
    MultiSelectComponent,
    FileUploadComponent,
    TextAreaComponent,
    SectionHeaderComponent,
    FormTemplateComponent,
  ],
  imports: [ 
   BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    MatGridListModule,
  ],
  providers: [UploadService],
  entryComponents: [
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    TextEditorComponent,
    TimeComponent,
    MultiSelectComponent,
    FileUploadComponent,
    TextAreaComponent,
    SectionHeaderComponent,
    FormTemplateComponent
  ],
  exports: [DynamicFormComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainFormModule { }




