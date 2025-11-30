import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../posts/post.entity';
import { User } from '../users/user.entity'
import { Comment } from './comment.entity';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private commentsRepository: Repository<Comment>
    ){}

    findByPostId(postId: string):Promise<Comment[]> {
        return this.commentsRepository.find({
            where: { post: { id: postId } },
            relations: ['user'],
            order: {
                createdAt: 'ASC'
            }
        })
    }

    async create(content: string, user: User, post: Post): Promise<Comment> {
        const newComment = this.commentsRepository.create({
            content,
            user,
            post
        })
        return this.commentsRepository.save(newComment)
    }
}
