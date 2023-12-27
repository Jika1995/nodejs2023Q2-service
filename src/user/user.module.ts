import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HashingService } from 'src/iam/hashing/hashing.service';
import { BcryptService } from 'src/iam/hashing/bcrypt.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    UserService,
  ],
})
export class UserModule {}
