import { User } from '../models/user.model';
import { userRepository } from '../repositories/user.repository';
import { userValidator } from '../helper/user.valadator';
import { validate } from 'uuid';

class UserService {
  async getAll(req: any, res: any): Promise<void> {
    const allUsers = await userRepository.getAll();
    res.statusCode = 200;
    res.end(JSON.stringify(allUsers));
  }

  async getById(req: any, res: any): Promise<void> {
    try {
      if (req.params.id && validate(req.params.id)) {
        const user: User | undefined = await userRepository.getById(req.params.id);
        if (user) {
          res.statusCode = 200;
          res.end(JSON.stringify(user));
        } else {
          res.statusCode = 404;
          res.end(JSON.stringify({ message: `User not found by id:${req.params.id}` }));
        }
      } else {
        res.statusCode = 400;
        res.end(JSON.stringify({ message: `User id:${req.params.id} is invalid` }));
      }
    } catch (error) {
      res.statusCode = 500;
      res.end(JSON.stringify({ message: 'DB error', error }));
    }
  }

  async create(req: any, res: any): Promise<void> {
    if (userValidator.validateBody(req.body)) {
      const newUser = await userRepository.create(req.body);
      if (newUser) {
        res.statusCode = 201;
        res.end(JSON.stringify(newUser));
      } else {
        res.statusCode = 500;
        res.end(JSON.stringify({ message: 'Internal error(creating new user) ' }));
      }
    } else {
      res.statusCode = 400;
      res.end(JSON.stringify({ message: 'There are no all required fields' }));
    }
  }

  async update(req: any, res: any): Promise<void> {
    try {
      if (req.params.id && validate(req.params.id) && userValidator.validateBody(req.body)) {
        if (!req.body.id) {
          req.body.id = req.params.id;
        }

        const user: User | undefined = await userRepository.update(req.params.id, req.body);
        if (user) {
          res.statusCode = 200;
          res.end(JSON.stringify(user));
        } else {
          res.statusCode = 404;
          res.end(JSON.stringify({ message: `User not found by id:${req.params.id}` }));
        }
      } else {
        res.statusCode = 400;
        res.end(JSON.stringify({ message: `User id:${req.params.id} is invalid` }));
      }
    } catch (error) {
      res.statusCode = 500;
      res.end(JSON.stringify({ message: 'DB error', error }));
    }
  }

  async remove(req: any, res: any): Promise<void> {
    try {
      if (req.params.id && validate(req.params.id)) {
        const user: User | undefined = await userRepository.remove(req.params.id);
        if (user) {
          res.statusCode = 204;
          res.end();
        } else {
          res.statusCode = 404;
          res.end(JSON.stringify({ message: `User not found by id:${req.params.id}` }));
        }
      } else {
        res.statusCode = 400;
        res.end(JSON.stringify({ message: `User id:${req.params.id} is invalid` }));
      }
    } catch (error) {
      res.statusCode = 500;
      res.end(JSON.stringify({ message: 'DB error', error }));
    }
  }
}

export const userService: UserService = new UserService();
