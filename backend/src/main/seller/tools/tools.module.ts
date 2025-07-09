import { Module } from "@nestjs/common";
import { ToolModule } from "./tool/ToolModule.module";
import { ToolUnitModule } from "./tool-item/ToolUnitModule.module";
import { ToolUnitPhotoModule } from "./tool-photo/ToolUnitPhotoModule.module";
import { VisitToolUnitModule } from "./tool-visit/VisitToolUnitModule.module";

@Module({
  imports: [
    ToolModule,
    ToolUnitModule,
    ToolUnitPhotoModule,
    VisitToolUnitModule,
  ],
  exports: [
    ToolModule,
    ToolUnitModule,
    ToolUnitPhotoModule,
    VisitToolUnitModule,
  ],
})
export class ToolsModule {}
