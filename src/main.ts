import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path'
import { NestExpressApplication } from '@nestjs/platform-express';
import { createClient } from 'redis';
import { RedisStore } from 'connect-redis';
import session from 'express-session'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const redisClient = createClient({
    url:  "rediss://default:Ae00000eFmpB4x5rrrA6SEqZvkuFFn9KzHKu+WCBCcpkkcTrcpLyCua++mo1qml0uvqzmKv@personalblog-jmhb-cdfh-748780.leapcell.cloud:6379",
  })
  await redisClient.connect().catch(console.error)

  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'blog-session:'
  })

  app.use(
    session({
      store: redisStore, // Use Redis for storage
      secret: 'WCBCcpkkcTrcpLyCua', // Replace with a random, complex string
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      },
    })
  );

  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setBaseViewsDir(join(__dirname, '..', 'views'))
  app.setViewEngine('ejs')

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
