import { Injectable } from "@nestjs/common";
import { CrudServiceFrom } from "../../../patterns/crud-pattern/mixins/crud-service.mixin";
import { CrudServiceStructure } from "../../../patterns/crud-pattern/interfaces/structures/crud-service-structure.interface";
import { PageLink } from "../entities/page-link.entity";
import { CreatePageLinkInput } from "../dto/create-page-link.input";


export const serviceStructure = CrudServiceStructure({
    entityType:PageLink,
    createInputType:CreatePageLinkInput,
    updateInputType:CreatePageLinkInput,
  })

@Injectable()
export class PageLinkService extends CrudServiceFrom(serviceStructure) {
}