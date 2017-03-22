import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import {TodosService} from '../services/todos.service';
import {Todo} from '../models/todo';

@Component({
    selector: 'todo-item',
    templateUrl: '/app/modules/todos/views/todo.item.view.html',
})
export class TodoItemComponent implements OnInit {

    @Input() todo: Todo;
    @Output() update: EventEmitter<string> = new EventEmitter<string>();

    public isNew: boolean;
    public editMode: boolean;

    constructor (private service: TodosService){}

    ngOnInit() {
        this.isNew = !(this.todo && this.todo.id);

        if(this.isNew) {
            this.editMode = true;
        }
    }

    toggleCompleted(completed: boolean): void {
        this.todo.completed = completed;
        this.update.emit('completed');
    }

    changeTodoContent($event: KeyboardEvent): void {
        this.todo.content = (<HTMLInputElement>$event.target).value;
        this.update.emit('content');
        this.setEditMode(false);
    }

    setEditMode(editMode: boolean): void {
        this.editMode = editMode;
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