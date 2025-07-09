import { Injectable } from "@nestjs/common";
import { CrudServiceFrom } from "../../../patterns/crud-pattern/mixins/crud-service.mixin";
import { CrudServiceStructure } from "../../../patterns/crud-pattern/interfaces/structures/crud-service-structure.interface";
import { Position } from "../entities/position.entity";
import { CreatePositionInput } from "../dto/create-entity.inpit";
import { UpdatePositionInput } from "../dto/update-entity.input";



export const serviceStructure = CrudServiceStructure({
    entityType:Position,
    createInputType:CreatePositionInput,
    updateInputType:UpdatePositionInput,
  })

@Injectable()
export class PositionService extends CrudServiceFrom(serviceStructure) {

}