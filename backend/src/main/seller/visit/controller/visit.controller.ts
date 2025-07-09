import { Controller, Get, Param, Query, Render, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { VisitService } from "../services/visit.service";
import { CurrentContext } from "src/patterns/crud-pattern/decorators/current-context.decorator";
import { IContext } from "src/patterns/crud-pattern/interfaces/context.interface";
import { StatusVisitEnum } from "../emun/visit.emun";
import { Response } from 'express';
@Controller('/visit/')
@ApiTags('visit')
export class VisitController {
    constructor(
        private readonly visitService: VisitService
    ){}

    //@Render('resultado')
    @Get('/aceptOrDecline/:id/:status')
    async acceptOrDeclineVisit(
        @CurrentContext() context: IContext,
        @Param('id') id: string,
        @Param('status') status: StatusVisitEnum,
        // @Res() res: Response
    ){
        return this.visitService.acceptOrDeclineVisit(context,id,status)
    }

    @Get('/countStatusVisitByDate/:dateInit/:dateFinish')
    countStatusVisitByDate(
        @CurrentContext() context: IContext,
        @Param('dateInit') dateInit: string,
        @Param('dateFinish') dateFinish: string,
        // @Res() res: Response
    ){
        // return this.visitService.countStatusVisitByDate(context,dateInit,dateFinish, res)
        return this.visitService.countStatusVisitStatistic(context,dateInit,dateFinish)
    }

    @Get('/countStatusVisitComentStatic/:dateInit/:dateFinish')
    countStatusVisitComentStatic(
        @CurrentContext() context: IContext,
        @Param('dateInit') dateInit: string,
        @Param('dateFinish') dateFinish: string,
        // @Res() res: Response
    ){
        // return this.visitService.countStatusVisitByDate(context,dateInit,dateFinish, res)
        return this.visitService.countStatusVisitComentStatic(context,dateInit,dateFinish)
    }
    @Get('/commisionsDataUser')
    commisionsDataUser(){
        return this.visitService.commisionDataUser()
    }
     @Get('work')
    async downloadWorkReport(
        @Query('fechaInicio') fechaInicio: string,
        @Query('fechaFin') fechaFin: string,
        @Query('userId') userId: string,
        @Query('typeId') typeId: string,
        @Res() res: Response
    ) {
        await this.visitService.generateWorkedHoursExcel(new Date(fechaInicio), new Date(fechaFin), res, typeId);
    }
}