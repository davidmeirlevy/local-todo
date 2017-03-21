import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Subject, Observable} from "rxjs/Rx";

import {TodosService} from './todos.service';
import {Todo} from './todo';

@Component({
    selector: 'todos',
    templateUrl: '/app/templates/todos.component.html',
    providers: [TodosService]
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
        this.todos = TodosComponent.getFilteredTodos(this.service.getTodos(), this.type);
    }

    static getFilteredTodos(todos: Todo[], type): Todo[] {
        return todos.filter(todo => {return (type === 'completed') ? todo.completed : !todo.completed});
    }

    ngOnInit() {

        this.loadTodos();

        this.subject
            .debounceTime(1000)
            .map(type => {return type === 'completed'})
            .subscribe(() => this.todos = TodosComponent.getFilteredTodos(this.todos, this.type));

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