import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import { DatepickerModule } from 'angular2-material-datepicker';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {TodoListComponent} from './todo-list/todo-list.component';
import {TodoItemComponent} from './todo-item/todo-item.component';
import {InputFocusDirective} from '../common/directives/input.focus.directive';
import {routes} from './todo.routes';
import {TodoService} from "./todo.service";


@NgModule({
    imports: [
        BrowserModule,
        MaterialModule,
        DatepickerModule,
        FormsModule,
        RouterModule.forRoot(routes),
    ],
    declarations: [
        TodoListComponent,
        TodoItemComponent,
        InputFocusDirective
    ],
    providers: [TodoService]
})
export class TodoModule {
}