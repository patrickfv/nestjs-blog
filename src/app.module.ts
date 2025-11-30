import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '9qasp5v56q8ckkf5dc.leapcellpool.com',
      port: 6438,
      username: 'sovbxmhfiinyuxosrpyi',
      password: 'scqpwqjhnyjbpuujhcpnyewlmvardv',
      database: 'uoupvldsiqknrvnyvnjt',
      entities: [__dirname+'/**/*.entity{.ts,.js'],
      synchronize: true,
      ssl: true,
      autoLoadEntities: true
    }),
    PostsModule,
    UsersModule,
    AuthModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
