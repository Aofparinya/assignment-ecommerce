import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from 'src/auth/auth.service';

@Module({
  providers: [UsersService,AuthService],
  controllers: [UsersController]
})
export class UsersModule {}
