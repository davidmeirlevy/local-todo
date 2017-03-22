import {Injectable} from '@angular/core';

@Injectable()
export class StorageService {

    constructor(private directory: string) {}

    private getKey(id: string | number): string {
        return this.directory + '.' + id;
    }

    static getRow(key: string): string {
        return JSON.parse(localStorage.getItem(key));
    }

    getAll(): any[] {
        return Object
            .keys(localStorage)
            .map(key => {
                return key.indexOf(this.getKey('')) === 0 ? StorageService.getRow(key) : null;
            })
            .filter(Boolean);
    }

    get(id: string | number) {
        return StorageService.getRow(this.getKey(id));
    }

    set(id: string | number, value): StorageService {
        localStorage.setItem(this.getKey(id), JSON.stringify(value));
        return this;
    }

    remove(id: string): StorageService {
        localStorage.removeItem(this.getKey(id));
        return this;
    }

}