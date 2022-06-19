import { User } from '../models/user.model';

class UserRepository {
  private db: User[];

  constructor() {
    this.db = [];
  }

  async getAll(): Promise<User[]> {
    return this.db;
  }

  async getById(id: string): Promise<User | undefined> {
    return this.db.find((user) => user.id === id);
  }

  async create(body: any): Promise<User> {
    const newUser = new User(body.username, body.age, body.hobbies);
    this.db.push(newUser);

    return newUser;
  }

  async update(id: string, user: User): Promise<User> {
    const index: number = this.db.findIndex((user) => user.id === id);
    if (~index) {
      this.db[index] = user;
    }

    return user;
  }

  async remove(id: string): Promise<User | undefined> {
    const deletedUser: User | undefined = this.db.find((user) => user.id === id);

    if (deletedUser) {
      const tempDb: User[] = [...this.db];
      this.db.length = 0;
      tempDb.forEach((user) => (user !== deletedUser ? this.db.push(user) : ''));
    }

    return deletedUser;
  }
}

export const userRepository = new UserRepository();
