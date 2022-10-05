import { DeleteUserParams, UpdateUserParams, CreateUserProfileParams, CreateUserPostParams } from './../../../utils/types';
import {  HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { CreateUserProfileDto } from 'src/users/dtos/CreateUserProfile.dto';
import { Profile } from 'src/typeorm/entities/Profile';
import { Post } from 'src/typeorm/entities/Post';

@Injectable()
export class UsersService {

    //how we interact with database 
    constructor(
      @InjectRepository(User) private userRepository: Repository<User>,
      @InjectRepository(Profile) private profileRepository: Repository<Profile>,
      @InjectRepository(Post) private postRepository: Repository<Post>,
      ){ // user service me hum UserEntity use krrhy to user.module.ts file me imports me entity wali file import krni pregi wrna error dega

    }
  findUsers(){
    return this.userRepository.find({relations:['profile','posts']}) // agar user get krty hue profile ka data bhi chye to profiledto me sy dekh k relation likhdo
  }
  createUser(userDetails: CreateUserParams){ //CreateUserParams is for validatting the paramters
    const newuser = this.userRepository.create({...userDetails, createdAt:new Date()})

   return this.userRepository.save(newuser)
  }

  updateUser(id:number,updateUserDetails: UpdateUserParams){
   return this.userRepository.update({id},{...updateUserDetails})
  }
  deleteUser(id:number){
    return this.userRepository.delete({id})
  }
 async createUserProfile(id:number,createUserProfile: CreateUserProfileParams){
    const user =  await this.userRepository.findOneBy({id})
    if(!user) throw new HttpException("user not found, cannot create profile",HttpStatus.BAD_REQUEST)
   const newProfile = this.profileRepository.create(createUserProfile)
   const saveProfile = await this.profileRepository.save(newProfile)
   user.profile = saveProfile;
   return this.userRepository.save(user)
  }

  async createUserPost(id:number,createUserPost: CreateUserPostParams){
    const user =  await this.userRepository.findOneBy({id})
    if(!user) throw new HttpException("user not found, cannot create profile",HttpStatus.BAD_REQUEST)
    const newPost = this.postRepository.create({...createUserPost,user})
    return await this.postRepository.save(newPost)
   
  }
}
