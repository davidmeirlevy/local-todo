import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import { DatepickerModule } from 'angular2-material-datepicker';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {AppComponent} from '../components/app.component';
import {TodosModule} from "../../todos/config/todos.module";


@NgModule({
    imports: [
        BrowserModule,
        MaterialModule,
        DatepickerModule,
        RouterModule.forRoot([]),
        FormsModule,
        TodosModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}