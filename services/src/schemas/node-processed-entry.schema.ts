import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NodeProcessedEntryDocument = NodeProcessedEntry & Document;

@Schema({ optimisticConcurrency: true })
export class NodeProcessedEntry {

  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  twitter: string;

  @Prop()
  facebook: string;

  @Prop()
  telegram: string;

  @Prop()
  nodeCountry: string;

  @Prop()
  nodeCity: string;

  @Prop({ required: true })
  nodeOwnerAddress: string;

  @Prop({ required: true })
  createdDate: number;

  @Prop()
  version: number;

  @Prop()
  packageVersion: string;

  @Prop()
  packageCommitID: string;

  @Prop()
  blockHeight: string;

  @Prop()
  outdated: boolean;

  @Prop()
  responseTime: number;

  @Prop({ default: false })
  lastPingFailed: boolean;

  @Prop()
  lastKnownUpTimestamp: number;

  @Prop()
  firstPingTimestamp: number;

  @Prop()
  lastAttemptedPingTimestamp: number;

  @Prop({ default: 0 })
  downtimeSeconds: number;

  @Prop({ default: 100 })
  uptimePercentage: number;

  @Prop()
  status: string;

  @Prop({ default: false })
  primarySource: boolean;

}

export const NodeProcessedEntrySchema = SchemaFactory.createForClass(NodeProcessedEntry);
