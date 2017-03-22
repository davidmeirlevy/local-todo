import {Injectable} from '@angular/core';
import {Todo} from "../models/todo";
import {StorageService} from  '../../core/services/storage.service';

@Injectable()
export class TodosService {

    private static storage: StorageService;
    private static todos: Todo[];
    private proxyHandler = {
        set: this.save.bind(this)
    };

    constructor () {
        if(!TodosService.storage) {
            TodosService.storage = new StorageService('todos');
        }
    }

    create(todo: Todo): Todo {
        return new Proxy(todo, this.proxyHandler);
    }

    getTodos(): Todo[] {
        if(!TodosService.todos) {
            TodosService.todos = TodosService.storage.getAll() || [];
            TodosService.todos = TodosService.todos.map(todo => {
                todo.completed = todo.completed || false;
                todo.deadline = new Date(todo.deadline);

                return this.create(todo);
            });
        }
        return [].concat(TodosService.todos);
    }

    private addTodo(todo: Todo): TodosService {
        TodosService.storage.set(todo.id, todo);
        if(!TodosService.todos) {
            this.getTodos();
        }
        TodosService.todos.unshift(todo);
        return this;
    }

    private updateTodo(todo: Todo): TodosService {
        TodosService.storage.set(todo.id, todo);
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
        TodosService.storage.remove(id);
        TodosService.todos = TodosService.todos.filter(todo => {return todo.id !== id});
        return this;
    }
}