import {User} from '../models/user.model.js'
import {dtoUser} from '../models/dtoUser.interface.js'
import {db} from '../../assets/db/initDB.js'

class UserService {

    getAll(): User[] {
        return db
    }

    getById(id: string):User|undefined {
        return db.find(user => user.id === id)
    }

    create(body: dtoUser):User {
        const newUser = new User(body.name, body.age, body.hobbies);
        db.push(newUser)

        return newUser
    }

    update(id: string, user: User):User {
        const index:number = db.findIndex(user=> user.id === id)
        if (~index) {
            db[index] = user
        }

        return user
    }    

    remove(id: string):User|undefined {
        const deletedUser:User|undefined = db.find(user=> user.id === id)
        
        if (deletedUser) {
            const tempDb:User[] = [...db]
            db.length = 0
            tempDb.forEach(user => user !== deletedUser ? db.push(user) : '')
        }
        
        return deletedUser
    }
}

export const userService = new UserService()