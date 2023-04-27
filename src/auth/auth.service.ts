import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, from, of } from 'rxjs';
import { RegisterDto } from 'src/dto/register.dto';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class AuthService {

    private user = [
        {
            id:1,
            username: "test",
            firstname : "test",
            lastname: "test",
            email :'test@gmail.com',
            password: "123",
        }
    ];

    private currentId: number = 1;
    generateId(): number {
        this.currentId++;
        return this.currentId;
      }
    
    register(registerDto: RegisterDto) {
        const user = new User();
        user.username = registerDto.username;
        user.firstname = registerDto.firstname;
        user.lastname = registerDto.lastname;
        user.email = registerDto.email;
        user.password =  registerDto.password;
        user.id = this.currentId;

        if (!this.user) {
            this.user = [];
        }
        this.user.push(user)
        return user;
    }
/*
    constructor(private readonly jwtService: JwtService){}

    generateJWT(user: User): Observable <string> {
        return from(this.jwtService.signAsync({user}));
    }

    hashPassword(password: string): Observable <string> { 
        return from<string>(bcrypt.hash(password, 12));

    }

    comparePasswords(newPassword: string, passwortHash: string): Observable <any | boolean> {
        return of<any | boolean>(bcrypt.compare(newPassword, passwortHash));
    }
*/
}
