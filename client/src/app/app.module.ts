import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import { DatepickerModule } from 'angular2-material-datepicker';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {TodoModule} from "../todo/todo.module";
import {StorageService} from '../common/services/storage.service';


@NgModule({
    imports: [
        BrowserModule,
        MaterialModule,
        DatepickerModule,
        RouterModule.forRoot([]),
        FormsModule,
        TodoModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [StorageService],
    bootstrap: [AppComponent]
})
export class AppModule {
}