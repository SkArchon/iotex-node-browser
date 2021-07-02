import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NodeUserAccountDocument = NodeUserAccount & Document;

@Schema({ optimisticConcurrency: true })
export class NodeUserAccount {
  
  @Prop()
  userAddress: string;

  @Prop()
  createdDate: number;

  @Prop({ default: true })
  isAdmin: boolean;

}

export const NodeUserAccountSchema = SchemaFactory.createForClass(NodeUserAccount);
