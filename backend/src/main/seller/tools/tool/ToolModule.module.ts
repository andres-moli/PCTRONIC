import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tool } from "./entities/tool.entity";
import { ToolService } from "./service/tool-service";
import { ToolResolver } from "./resolver/tool.resolver";

@Module({
    imports: [TypeOrmModule.forFeature([Tool])],
    providers: [ToolService, ToolResolver],
    exports: [ToolService],
})
  export class ToolModule {}
  