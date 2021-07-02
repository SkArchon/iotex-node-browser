import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SignedRequest } from 'src/models/signed-request';
import { NodeService } from 'src/services/node.service';

@Controller("/node")
export class NodeController {
  constructor(private readonly nodeService: NodeService) {}

  @Post()
  async createOrUpdateNode(@Body() data) {
    return await this.nodeService.createOrUpdateNode(data);
  }

  @Post("/search")
  async load(@Body() searchCriteria: SignedRequest<any>) {
    return await this.nodeService.findAll(searchCriteria);
  }

  @Post("/search/:id")
  async loadById(@Body() searchCriteria: SignedRequest<any>, @Param() params) {
    return await this.nodeService.findById(searchCriteria, params.id);
  }

  @Post("/approve")
  async approveNode(@Body() approveRequest: SignedRequest<any>) {
    return await this.nodeService.processNodeApproval(approveRequest, "approve");
  }

  @Post("/reject")
  async rejectNode(@Body() approveRequest: SignedRequest<any>) {
    return await this.nodeService.processNodeApproval(approveRequest, "reject");
  }
  
}
