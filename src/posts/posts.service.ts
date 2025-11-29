import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>
    ) {}

    findAll(): Promise<Post[]> {
        return this.postRepository.find({
            order: { createdAt: 'DESC'}
        })
    }

    findOne(id: string): Promise<Post|null> {
        return this.postRepository.findOneBy({ id })
    }

    async create(post: Partial<Post>): Promise<Post> {
        const newPost = this.postRepository.create(post)
        return this.postRepository.save(newPost)
    }
}
