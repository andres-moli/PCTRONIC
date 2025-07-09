import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PageLink } from "./entities/page-link.entity";
import { PageLinkResolver } from "./resolver/page-link.resolver";
import { PageLinkService } from "./service/page-link.service";

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([PageLink])],
    providers: [PageLinkResolver, PageLinkService],
    exports: [PageLinkService]
})

export class PageLinkModule {}
  