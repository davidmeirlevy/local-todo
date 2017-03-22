import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import { DatepickerModule } from 'angular2-material-datepicker';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {TodosComponent} from '../components/todos.component';
import {TodoItemComponent} from '../components/todo.item.component';
import {routes} from './todos.routes';
import {TodosService} from "../services/todos.service";


@NgModule({
    imports: [
        BrowserModule,
        MaterialModule,
        DatepickerModule,
        FormsModule,
        RouterModule.forRoot(routes),
    ],
    declarations: [
        TodosComponent,
        TodoItemComponent,
    ],
    providers: [TodosService]
})
export class TodosModule {
}