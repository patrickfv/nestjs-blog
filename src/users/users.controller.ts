import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { UsersService } from './users.service'
import type { Response } from 'express'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('register')
    @Render('register')
    showRegisterForm() {
        return
    }

    @Post('register')
    async register(@Body() body: any, @Res() res: Response) {
        await this.usersService.create(body)
        res.redirect('/auth/login')
    }
}
