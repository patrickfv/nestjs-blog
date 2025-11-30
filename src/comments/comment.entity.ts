import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToOne} from 'typeorm'
import { User } from '../users/user.entity'
import { Post } from '../posts/post.entity'

@Entity()
export class Comment {
    @PrimaryColumn({ type: 'uuid', default: () => 'gen_random_uuid()'})
    id: string

    @Column('text')
    content: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => User, user => user.comments)
    user: User

    @ManyToOne(() => Post, post => post.comments)
    post: Post
}