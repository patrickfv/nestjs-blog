import { Body, Controller, Get, Post, Render, Res, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service'
import type { Response } from 'express'
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('register')
    @Render('register')
    @UseGuards(AuthenticatedGuard)
    showRegisterForm(@Request() req) {
        return { user: req.session.user }
    }

    @Post('register')
    async register(@Body() body: any, @Res() res: Response) {
        await this.usersService.create(body)
        res.redirect('/auth/login')
    }
}
