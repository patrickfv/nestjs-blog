import { Controller, Get, Render, Param, Post, Body, Res, UseGuards, Request} from '@nestjs/common';
import { PostsService } from './posts.service';
import type { Response } from 'express'
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get()
    @Render('index')
    @UseGuards(AuthenticatedGuard)
    async root(@Request() req) {
        // id 90e4f754-468a-48ea-a626-7275c17bcba1
        const posts = await this.postsService.findAll()
        return { posts, user: req.session.user }
    }

    @UseGuards(AuthenticatedGuard)
    @Get('new')
    @Render('new-post')
    newPostForm(@Request() req) { return { user: req.session.user } }

    @UseGuards(AuthenticatedGuard)
    @Post()
    async create(@Body() body: { title: string, content: string }, @Res() res: Response) {
        await this.postsService.create(body)
        res.redirect('/posts')
    }

    @UseGuards(AuthenticatedGuard)
    @Get(':id')
    @Render('post')
    async post(@Param('id') id: string, @Request() req) {
        const post = await this.postsService.findOne(id)
        return { post, user: req.session.user }
    }
}
