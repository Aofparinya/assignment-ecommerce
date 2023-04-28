import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from, of } from 'rxjs';
import { RegisterDto } from 'src/dto/register.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {

    /*
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }
    */

    async validateUser(username: string, password: string) : Promise<any> {

    }

}
