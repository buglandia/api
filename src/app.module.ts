import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private conection: Connection) {}
}
