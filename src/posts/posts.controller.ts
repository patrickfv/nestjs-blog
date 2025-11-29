import { Controller, Get, Render, Param, Post, Body, Res} from '@nestjs/common';
import { PostsService } from './posts.service';
import type { Response } from 'express'

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get()
    @Render('index')
    async root() {
        // id 90e4f754-468a-48ea-a626-7275c17bcba1
        const posts = await this.postsService.findAll()
        return { posts }
    }

    @Get('new')
    @Render('new-post')
    newPostForm() {}

    @Post()
    async create(@Body() body: { title: string, content: string }, @Res() res: Response) {
        await this.postsService.create(body)
        res.redirect('/posts')
    }

    @Get(':id')
    @Render('post')
    async post(@Param('id') id: string) {
        const post = await this.postsService.findOne(id)
        return { post }
    }
}
