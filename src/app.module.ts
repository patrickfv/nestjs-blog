import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
