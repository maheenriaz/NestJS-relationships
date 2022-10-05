import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";
import { Profile } from "./Profile";


@Entity({name:"users"}) // ye likhny sy table create hojata isi name sy

export class User{
    @PrimaryGeneratedColumn({type:"bigint"})
    id:number;

    @Column({
        unique:true
    })
    username: string;

    @Column()
    password:string;

    @Column()
    createdAt:Date;

    @Column({nullable:true})
    authStrategy:string;

    @OneToOne(()=> Profile)  //one-one relation
    @JoinColumn()
    profile:Profile

    @OneToMany(()=> Post,(post)=>post.user)  //one-many relation // yehi cheez user me jakr likhni tbhi 1-many banyega
    posts:Post[]
}