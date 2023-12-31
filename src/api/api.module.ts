import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { AuthModule } from './auth/auth.module';
import { DomainsModule } from './domains/domains.module';
import { ThirdPartyModule } from './third-party/third-party.module';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [ApiController],
  providers: [ApiService],
  imports: [AuthModule, DomainsModule, ThirdPartyModule, UsersModule],
})
export class ApiModule {}
