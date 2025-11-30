import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    async create(user: Partial<User>): Promise<User> {
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(user.password || '', saltRounds)
        const newUser = this.usersRepository.create({
            username: user.username,
            password: hashedPassword,
        })

        return this.usersRepository.save(newUser)
    }

    async findOne(username: string): Promise<User | null> {
        return this.usersRepository.findOneBy({ username })
    }
}
