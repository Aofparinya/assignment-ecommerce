import { IsNotEmpty, Matches, isNotEmpty } from "class-validator";

export class RegisterDto {
    
    @IsNotEmpty()
    username:string;
    
    @IsNotEmpty()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ , {
        message : 'Password must have minimum eight characters, at least one letter and one number'
    })
    password:string;

    @IsNotEmpty()
    firstname:string;

    @IsNotEmpty()
    lastname:string;

    @IsNotEmpty()
    email:string;
}
