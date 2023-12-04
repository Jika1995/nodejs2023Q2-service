import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingService } from 'src/iam/hashing/hashing.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const user = new User();
      user.login = createUserDto.login;
      user.password = await this.hashingService.hash(createUserDto.password);
      await this.usersRepository.save(user);
    } catch (err) {
      const pgUniqueViolationErrorCode = '23505';
      if (err.code === pgUniqueViolationErrorCode) {
        throw new ConflictException();
      }
      throw err;
    }
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with this id not found`);
    }
    return user;
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with this id not found`);
    }

    const isEqual = await this.hashingService.compare(
      updatePasswordDto.oldPassword,
      user.password,
    );

    if (!isEqual) {
      throw new UnauthorizedException('Old Password is wrong');
    }

    const hashedPassword = await this.hashingService.hash(
      updatePasswordDto.newPassword,
    );

    await this.usersRepository.update(id, {
      password: hashedPassword,
    });

    return await this.findOne(id);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return this.usersRepository.remove(user);
  }
}
