import { Controller, Get, MessageEvent, Param, ParseIntPipe, Post, Sse } from '@nestjs/common';
import { Observable, defer, map, repeat } from 'rxjs';
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

  @Sse(':id/events')
  events(@Param('id', new ParseIntPipe()) id: number): Observable<MessageEvent> {
    return defer(() => this.reportService.findOne(id)).pipe(
      repeat({
        delay: 1000,
      }),
      map((report) => ({
        type: 'message',
        data: report,
      })),
    );
  }
}
