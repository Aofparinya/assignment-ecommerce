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

    viewProfileByUser(username: string) {
        return this.user.find(u => u.username === username);
    }

    async createUser(registerDto: RegisterDto) {
        let finduser = await this.userRepository
            .createQueryBuilder("user")
            .where("user.username = :username", { username: registerDto.username })
            .getOneOrFail();

        if (!finduser) {
            const newUser = this.userRepository.create(registerDto);
            return this.userRepository.save(newUser);
        } else {
            return "Has this username in system";
        }

    }

}

