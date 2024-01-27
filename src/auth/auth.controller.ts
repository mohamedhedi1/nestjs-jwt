import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('/local/signup')
    @HttpCode(HttpStatus.CREATED)
    signuplocal(@Body() dto : AuthDto): Promise<Tokens>{
       return this.authService.signuplocal(dto)
    }

    @Post('/local/signin')
    @HttpCode(HttpStatus.OK)
    signinlocal(@Body() dto : AuthDto): Promise<Tokens>{
     return  this.authService.signinlocal(dto)
    }


    @UseGuards(AuthGuard('jwt'))
    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    logout(@Req() req : Request){
        const user = req.user['sub'];
       return this.authService.logout(user)
    }


    @UseGuards(AuthGuard('jwt-refresh'))
    @HttpCode(HttpStatus.OK)
    @Post('/refresh')
    refreshTokens(@Req() req : Request ){
        const user = req.user;
        return this.authService.refreshTokens(user['sub'],user['refreshToken'])
    }
}
