import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Subject} from "rxjs/Rx";

import {TodosService} from '../services/todos.service';
import {Todo} from '../models/todo';

@Component({
    selector: 'todos',
    templateUrl: '/app/modules/todos/views/todos.view.html',
})
export class TodosComponent implements OnInit {

    todos: Todo[];
    type: string;

    constructor(private service: TodosService,
                private route: ActivatedRoute) {

        route.url
            .map(segments => segments.join(''))
            .subscribe(
                (type) => this.type = type,
                () => this.loadTodos());
    }

    private subject = new Subject<any>();

    private loadTodos(): void {
        this.filterTodos(this.service.getTodos());
    }

    private filterTodos(todos: Todo[]|undefined): Todo[] {
        return this.todos = (todos || this.todos)
            .filter(todo => {return (this.type === 'completed') ? todo.completed : !todo.completed});
    }

    ngOnInit() {

        this.loadTodos();

        this.subject
            .debounceTime(1000)
            .map(type => {return type === 'completed'})
            .subscribe(() => this.filterTodos());

        this.subject
            .filter(type => {return type === 'removed'})
            .subscribe(() => this.loadTodos());
    }

    onChange(type: string): void {
        if(type) {
            this.subject.next(type);
        }
    }

    addTodo(): void {
        this.todos.unshift(this.service.create({
            id: '',
            content: '',
            completed: false,
            deadline: new Date()
        }));
    }

}