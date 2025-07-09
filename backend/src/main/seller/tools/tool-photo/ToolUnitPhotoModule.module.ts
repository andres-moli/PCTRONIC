import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ToolUnitPhoto } from "./entities/tool-unit-photo.entity";
import { VisitToolUnitPhotoService } from "./service/tool-photo-service";
import { ToolItemPhotoResolver } from "./resolver/tool-photo.resolver";
import { VisitToolUnitModule } from "../tool-visit/VisitToolUnitModule.module";
import { FilesModule } from "src/general/files/files.module";

@Module({
    imports: [TypeOrmModule.forFeature([ToolUnitPhoto]), forwardRef(()=>VisitToolUnitModule), FilesModule],
    providers: [VisitToolUnitPhotoService, ToolItemPhotoResolver],
    exports: [VisitToolUnitPhotoService],
  })
  export class ToolUnitPhotoModule {}
  