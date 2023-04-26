import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/dto/user.dto';

@Injectable()
export class UsersService {

    private user:UserDto[] = 
    [
        { username: 'aof', password: 'test', name: 'user1', email: 'user1@gmail.com', id:1},
        { username: 'test2', password: 'test2', name: 'user2', email: 'user2@gmail.com', id:2},
        { username: 'test3', password: 'test3', name: 'user13', email: 'user3@gmail.com', id:3},
    ];

    viewProfileByUser(username : string) {
       return this.user.find(u => u.username === username);
    }

}

