import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm'
import { Comment } from 'src/comments/comment.entity'

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column('text')
    content: string

    @CreateDateColumn()
    createdAt: Date

    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[]
}