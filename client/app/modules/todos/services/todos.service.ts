import {Injectable} from '@angular/core';
import {Todo} from "../models/todo";
import {StorageService} from  '../../core/services/storage.service';

@Injectable()
export class TodosService {

    private storage: StorageService;
    private todos: Todo[];
    private proxyHandler = {
        set: this.save.bind(this)
    };

    constructor () {
        this.storage = new StorageService('todos');
    }

    create(todo: Todo): Todo {
        return new Proxy(todo, this.proxyHandler);
    }

    getTodos(): Todo[] {
        if(!this.todos) {
            this.todos = this.storage.getAll().map(todo => {
                todo.completed = todo.completed || false;
                todo.deadline = new Date(todo.deadline);

                return this.create(todo);
            });
        }
        return [...this.todos];
    }

    private addTodo(todo: Todo): TodosService {
        this.storage.set(todo.id, todo);
        if(this.todos) {
            this.todos.unshift(todo);
        } else {
            this.getTodos();
        }
        return this;
    }

    private updateTodo(todo: Todo): TodosService {
        this.storage.set(todo.id, todo);
        return this;
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

    removeTodo(todo: Todo): TodosService {
        const id = todo.id;
        this.storage.remove(id);
        this.todos = this.todos.filter(todo => {return todo.id !== id});
        return this;
    }
}