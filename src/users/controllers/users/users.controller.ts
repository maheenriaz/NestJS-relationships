import { CreateUserProfileDto } from './../../dtos/CreateUserProfile.dto';

import { CreateUserDto } from './../../dtos/CreateUser.dto';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { Response } from 'express';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { CreateUserPostDto } from 'src/users/dtos/CreateUserPost';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){

    }
    @Get('/')
   async getUser(@Res() res:Response){
       const users = await this.userService.findUsers()
       console.log("users",users)
       res.send(users)
    }

    @Post('create')
    // dto isliye create kiya hy taky parameter me type defie na krni pre
    // dto controller file me dengy
    createUser(@Body() craeteUserDto: CreateUserDto){ 
        // const {...userDetails, confirmPassword} = CreateUserDto;
        this.userService.createUser(craeteUserDto)
    }


    //put req pori bdy ko update krny k liye use krty patch partial body ko update krny k liye
    @Put(':id')
   async updateUserById(@Param('id',ParseIntPipe)  id:number, @Body() updateUserDto:UpdateUserDto){
       await this.userService.updateUser(id,updateUserDto)
    }

    @Delete('/delete/:id')
    async deleteUserById(@Param('id',ParseIntPipe)  id:number){
        await this.userService.deleteUser(id)
    }

    @Post('/:id/profiles')
    // dto isliye create kiya hy taky parameter me type defie na krni pre
    // dto controller file me dengy
    createUserProfile(
        @Param('id',ParseIntPipe) id:number,
        @Body() createUserProfileDto: CreateUserProfileDto
        ){ 
        // const {...userDetails, confirmPassword} = CreateUserDto;
       return this.userService.createUserProfile(id,createUserProfileDto)
    }

    @Post('/:id/posts')
    // dto isliye create kiya hy taky parameter me type defie na krni pre
    // dto controller file me dengy
    createUserPost(
        @Param('id',ParseIntPipe) id:number,
        @Body() createUserPostDto: CreateUserPostDto
        ){ 
        // const {...userDetails, confirmPassword} = CreateUserDto;
       return this.userService.createUserPost(id,createUserPostDto)
    }
}
