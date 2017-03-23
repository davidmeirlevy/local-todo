import {Injectable} from '@angular/core';
import {Todo} from "../common/models/todo";
import {StorageService} from  '../common/services/storage.service';
import {STORAGE_DIRECTORY} from "./todo.defines";

@Injectable()
export class TodoService {

    private todos: Todo[];
    private proxyHandler = {
        set: this.save.bind(this)
    };

    constructor (private storage: StorageService) {}

    private addTodo(todo: Todo): TodoService {
        this.storage.set(STORAGE_DIRECTORY, todo.id, todo);
        if(this.todos) {
            this.todos.unshift(todo);
        } else {
            this.getTodos();
        }
        return this;
    }

    private updateTodo(todo: Todo): TodoService {
        this.storage.set(STORAGE_DIRECTORY, todo.id, todo);
        return this;
    }

    create(todo: Todo): Todo {
        return new Proxy(todo, this.proxyHandler);
    }

    getTodos(): Todo[] {
        if(!this.todos) {
            this.todos = this.storage.getAll(STORAGE_DIRECTORY).map(todo => {
                todo.completed = todo.completed || false;
                todo.deadline = new Date(todo.deadline);

                return this.create(todo);
            });
        }
        return [...this.todos];
    }

    save(todo: Todo, prop: string = '', value: any): boolean {
        if(prop) {
            todo[prop] = value;
        }
        if(todo.id) {
            this.updateTodo(todo);
        } else {
            todo.id = Date.now().toString();
            this.addTodo(todo);
        }
        return true;
    }

    removeTodo(todo: Todo): TodoService {
        const id = todo.id;
        this.storage.remove(STORAGE_DIRECTORY, id);
        this.todos = this.todos.filter(todo => {return todo.id !== id});
        return this;
    }
}