import {Injectable} from '@angular/core';
import {Todo} from "./todo";
import {StorageService} from  './storage.service';

@Injectable()
export class TodosService {

    private static storage: StorageService;
    private static todos: Todo[];

    constructor () {
        if(!TodosService.storage) {
            TodosService.storage = new StorageService('todos');
        }
    }

    getTodos(): Todo[] {
        if(!TodosService.todos) {
            TodosService.todos = TodosService.storage.getAll() || [];
            TodosService.todos.forEach(todo => {
                todo.completed = todo.completed || false;
                todo.deadline = new Date(todo.deadline);
            });
        }
        return [].concat(TodosService.todos);
    }

    addTodo(todo: Todo): TodosService {
        TodosService.storage.set(todo.id, todo);
        if(!TodosService.todos) {
            this.getTodos();
        }
        TodosService.todos.unshift(todo);
        return this;
    }

    updateTodo(todo: Todo): TodosService {
        TodosService.storage.set(todo.id, todo);
        return this;
    }

    removeTodo(todo: Todo): TodosService {
        const id = todo.id;
        TodosService.storage.remove(id);
        TodosService.todos = TodosService.todos.filter(todo => {return todo.id !== id});
        return this;
    }
}