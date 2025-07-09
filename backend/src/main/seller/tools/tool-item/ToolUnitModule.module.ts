import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ToolUnit } from "./entities/tool-unit.entity";
import { ToolUnitService } from "./service/tool-item-service";
import { ToolItemResolver } from "./resolver/tool-item.resolver";
import { ToolModule } from "../tool/ToolModule.module";

@Module({
    imports: [TypeOrmModule.forFeature([ToolUnit]), ToolModule],
    providers: [ToolUnitService, ToolItemResolver],
    exports: [ToolUnitService],
  })
  export class ToolUnitModule {}
  