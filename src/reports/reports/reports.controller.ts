import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @Get()
  all() {
    return this.reportService.all();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.reportService.findOne(id);
  }

  @Post()
  request() {
    return this.reportService.request();
  }
}
