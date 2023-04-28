import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Order } from 'src/order/entities/order.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './guard-strategy/jwt-constants';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order]),
    PassportModule,
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' }
  }),
  ],
  providers: [AuthService, UsersService],
  controllers: [AuthController],
  exports: [UsersService, AuthService]

})
export class AuthModule { }
