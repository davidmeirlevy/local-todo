import {Injectable} from '@angular/core';

@Injectable()
export class StorageService {

    constructor() {}

    private getKey(directory: string = '', id: string | number = ''): string {
        return directory + '.' + id;
    }

    private getRow(key: string): string {
        return JSON.parse(localStorage.getItem(key));
    }

    getAll(directory: string = ''): any[] {
        return Object
            .keys(localStorage)
            .map(key => {
                return key.indexOf(this.getKey(directory)) === 0 ? this.getRow(key) : null;
            })
            .filter(Boolean);
    }

    set(directory: string = '', id: string | number, value): StorageService {
        localStorage.setItem(this.getKey(directory, id), JSON.stringify(value));
        return this;
    }

    remove(directory: string = '', id: string): StorageService {
        localStorage.removeItem(this.getKey(directory, id));
        return this;
    }

}