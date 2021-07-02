import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NodeEntryDocument = NodeEntry & Document;

@Schema({ optimisticConcurrency: true })
export class NodeEntry {

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

  @Prop({ required: true })
  status: 'pending' | 'approved' | 'rejected';

  @Prop()
  version: number;

  @Prop({ default: false })
  primarySource: boolean;

}

export const NodeEntrySchema = SchemaFactory.createForClass(NodeEntry);
