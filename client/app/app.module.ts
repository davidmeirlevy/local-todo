import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import { DatepickerModule } from 'angular2-material-datepicker';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {TodosComponent} from './todos.component';
import {TodoItemComponent} from "./todo.item.component";

const routes = [
    {path: '', redirectTo: '/todos', pathMatch: 'full'},
    {path: 'todos', component: TodosComponent},
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
        AppComponent,
        TodosComponent,
        TodoItemComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}