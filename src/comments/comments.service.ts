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

    async findByPostId(postId: string):Promise<Comment[]> {
        const comments = await this.commentsRepository.find({
            where: { post: { id: postId } },
            relations: ['user'],
            order: {
                createdAt: 'ASC'
            }
        })

        return this.structureComments(comments)
    }

    private structureComments(comments: Comment[]): Comment[] {
        const commentMap = new Map<string, Comment>()
        comments.forEach( comment => {
            comment.replies = []
            commentMap.set(comment.id, comment)
        })
        
        const rootComments: Comment[] = []
        comments.forEach(comment => {
            if (comment.parent) {
                const parentComment = commentMap.get(comment.parent.id)
                if (parentComment) {
                    parentComment.replies.push(comment)
                }
            } else {
                rootComments.push(comment)
            }
        })
        return rootComments
    }

    async create(content: string, user: User, post: Post, parentId?: string): Promise<Comment> {
        const newComment = this.commentsRepository.create({
            content,
            user,
            post,
            parent: parentId ? ({id: parentId} as Comment) : undefined
        })
        return (await this.commentsRepository.save([newComment]))[0]
    }
}
