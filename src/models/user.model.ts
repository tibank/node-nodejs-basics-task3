import { v4 as uuidv4 } from 'uuid';

export class User {
    id!: string
    name!: string
    age!: number
    hobbies!: string[]

    constructor(name: string, age: number, hobbies: string[] = []) {
        this.id = uuidv4();
        this.name = name;
        this.age = age;
        this.hobbies = hobbies;
      }
}