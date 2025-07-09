import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Position } from "./entities/position.entity";
import { PositionResolver } from "./resolver/position.resolver";
import { PositionService } from "./service/position.service";


@Module({
    imports: [TypeOrmModule.forFeature([Position])],
    providers: [PositionResolver, PositionService],
    exports: [PositionService]
})

export class PositionModule {}
  