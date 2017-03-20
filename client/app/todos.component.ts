import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs/Rx";

import {TodosService} from './todos.service';
import {Todo} from './todo';

@Component({
    selector: 'todos',
    templateUrl: '/app/templates/todos.component.html',
    providers: [TodosService]
})
export class TodosComponent implements OnInit {

    todos: Todo[];

    constructor(private service: TodosService) {}

    private subject = new Subject<any>();

    private loadTodos(): void {
        this.todos = TodosComponent.getFilteredTodos(this.service.getTodos());
    }

    static getFilteredTodos(todos: Todo[]): Todo[] {
        return todos.filter(todo => {return !todo.completed});
    }

    ngOnInit() {
        this.loadTodos();

        this.subject
            .debounceTime(1000)
            .map(type => {return type === 'completed'})
            .subscribe(() => this.todos = TodosComponent.getFilteredTodos(this.todos));

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
        this.todos.unshift({
            id: '',
            content: '',
            completed: false,
            deadline: new Date()
        });
    }

}