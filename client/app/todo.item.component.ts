import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Subject} from "rxjs/Rx";

import {TodosService} from './todos.service';
import {Todo} from './todo';

@Component({
    selector: 'todo-item',
    templateUrl: '/app/templates/todo.item.component.html',
    providers: [TodosService]
})
export class TodoItemComponent implements OnInit {

    @Input() todo: Todo;
    @Output() update: EventEmitter<string> = new EventEmitter<string>();

    public isNew: boolean;
    public editMode: boolean;
    private subject: Subject<KeyboardEvent> = new Subject<KeyboardEvent>();

    constructor (private service: TodosService){}

    ngOnInit() {
        this.isNew = !(this.todo && this.todo.id);

        if(this.isNew) {
            this.editMode = true;
        }

        // set value on enter
        this.subject
            .filter($event => {return $event.keyCode === 13})
            .map($event => {return $event.srcElement})
            .subscribe((target: HTMLInputElement) => {
                this.todo.content = target.value;
                this.editMode = false;
                this.update.emit('content');
        });

        // abort edit mode on esc
        this.subject
            .filter($event => {return $event.keyCode === 27})
            .subscribe(() => this.editMode = false);

    }

    toggleCompleted(completed: boolean): void {
        this.todo.completed = completed;
        this.update.emit('completed');
    }

    changeTodoContent($event: KeyboardEvent): void {
        this.subject.next($event);
    }

    changeTodoDeadline(date: Date) : void {
        this.todo.deadline = date;
        this.update.emit('deadline');
    }

    removeTodo() : void {
        this.service.removeTodo(this.todo);
        this.update.emit('removed');
    }
}