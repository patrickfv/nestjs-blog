import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Comment } from '../comments/comment.entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    username: string

    @Column()
    password: string

    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[]
}