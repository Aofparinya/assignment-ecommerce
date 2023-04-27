import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dto/user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { Observable, map } from 'rxjs';
import { RegisterDto } from 'src/dto/register.dto';
import { error } from 'console';

@Injectable()
export class UsersService {

    private user: UserDto[];

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private AuthService: AuthService
    ) { }

    // view profile 
    viewProfileByUser(username: string) {
        let user = this.userRepository.createQueryBuilder("user")
            .where("user.username = :username", { username: username })
            .getOneOrFail();
        return user;
    }

    // create user || register 
    async createUser(registerDto: RegisterDto) {
        let findUser = await this.userRepository.createQueryBuilder("user")
        .where("user.username =:username", {username: registerDto.username})
        .getOne();

        if (!findUser) {
            const newUser = this.userRepository.create(registerDto);
            return this.userRepository.save(newUser);
        } else {
            return "Has this username in system";
        }

    }

}

