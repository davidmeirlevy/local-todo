import { Routes } from '@angular/router';
import {TodoListComponent} from './todo-list/todo-list.component';

export let routes: Routes = [
    {path: '', redirectTo: '/active', pathMatch: 'full'},
    {path: 'active', component: TodoListComponent},
    {path: 'completed', component: TodoListComponent},
];