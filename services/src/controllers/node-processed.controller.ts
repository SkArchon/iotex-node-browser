import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignedRequest } from 'src/models/signed-request';
import { NodeProcessedService } from 'src/services/node-processed.service';
import { NodeService } from 'src/services/node.service';

@Controller("/node-processed")
export class NodeProcessedController {
  constructor(private readonly nodeProcessedService: NodeProcessedService) {}

  @Post("/search")
  async load(@Body() searchCriteria: any) {
    return await this.nodeProcessedService.findAll(searchCriteria);
  }

  @Get("/primary")
  async getPrimaryNode() {
    return await this.nodeProcessedService.getPrimaryNode();
  }


}
