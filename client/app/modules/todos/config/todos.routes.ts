import { Routes } from '@angular/router';
import {TodosComponent} from '../components/todos.component';

export let routes: Routes = [
    {path: '', redirectTo: '/active', pathMatch: 'full'},
    {path: 'active', component: TodosComponent},
    {path: 'completed', component: TodosComponent},
];