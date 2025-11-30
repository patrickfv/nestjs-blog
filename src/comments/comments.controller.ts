import { Controller, Param, Post, UseGuards, Body, Req, Res } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import type { Response, Request } from 'express';

@Controller('posts/:postId/comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @UseGuards(AuthenticatedGuard) 
    @Post()
    async create(
        @Param('postId') postId: string,
        @Body('content') content: string,
        @Body('parentId') parentId: string,
        @Req() req: Request,
        @Res() res: Response,

    ) {
        const {user} = req.session as any
        await this.commentsService.create(content, user, { id: postId } as any)
        res.redirect(`/posts/${postId}`)
    }
}
