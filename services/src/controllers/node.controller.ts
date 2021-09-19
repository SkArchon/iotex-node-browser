import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { SignedRequest } from 'src/models/signed-request';
import { NodeService } from 'src/services/node.service';

@Controller("/node")
export class NodeController {
  constructor(private readonly nodeService: NodeService) {}

  @Post()
  async createOrUpdateNode(@Body() data, @Req() request: Request) {
    return await this.nodeService.createOrUpdateNode(data, request.cookies.Authorization);
  }

  @Post("/search")
  async load(@Body() searchCriteria: any, @Req() request: Request) {
    return await this.nodeService.findAll(searchCriteria, request.cookies.Authorization);
  }

  @Post("/search/:id")
  async loadById(@Param() params, @Req() request: Request) {
     return await this.nodeService.findById(params.id, request.cookies.Authorization);
  }

  @Post("/approve")
  async approveNode(@Body() approveRequest: any, @Req() request: Request) {
    return await this.nodeService.processNodeApproval(approveRequest, "approve", request.cookies.Authorization);
  }

  @Post("/reject")
  async rejectNode(@Body() approveRequest: any, @Req() request: Request) {
    return await this.nodeService.processNodeApproval(approveRequest, "reject", request.cookies.Authorization);
  }

  // @Get("/test-something")
  // async testSomething() {
  //   return await this.nodeService.testSomething();
  // }
  
}
