import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import { DatepickerModule } from 'angular2-material-datepicker';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {TodosComponent} from '../components/todos.component';
import {TodoItemComponent} from '../components/todo.item.component';

const routes = [
    {path: '', redirectTo: '/active', pathMatch: 'full'},
    {path: 'active', component: TodosComponent},
    {path: 'completed', component: TodosComponent},
];

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
    ]
})
export class TodosModule {
}