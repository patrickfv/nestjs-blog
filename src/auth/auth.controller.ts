import { Controller, Get, Post, Render, Body, Res, UnauthorizedException, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service'
import type { Response } from 'express';
import { AuthenticatedGuard } from './authenticated.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get('login')
    @Render('login')
    showLoginForm(@Request() req) {
        return { user: req.session.user }
    }

    @Post('login')
    async login(@Body() body: any, @Res() res: Response, @Request() req) {
        const user = await this.authService.validateUser(body.username, body.password)
        if (!user) {
            throw new UnauthorizedException('Invalid credentials')
        }
        req.session.user = { id: user.id, username: user.username }
        res.redirect('/posts')
    }

    @UseGuards(AuthenticatedGuard)
    @Get('logout')
    logout(@Request() req, @Res() res: Response) {
        req.session.destroy( err => {
            if (err) {
                console.log(err)
            } 
            res.redirect('/')
        })
    }
}
