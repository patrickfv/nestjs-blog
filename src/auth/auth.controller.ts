import { Controller, Get, Post, Render, Body, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service'
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get('login')
    @Render('login')
    showLoginForm() {
        return
    }

    @Post('login')
    async login(@Body() body: any, @Res() res: Response) {
        const user = await this.authService.validateUser(body.username, body.password)
        if (!user) throw new UnauthorizedException()

        res.redirect('/posts')
    }
}
