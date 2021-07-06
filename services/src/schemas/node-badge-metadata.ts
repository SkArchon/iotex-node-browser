import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NodeBadgeMetadataDocument = NodeBadgeMetadata & Document;

export enum OnARollAwardDays {
  Week = 7,
  Month = 30,
  ThreeMonths = 90,
  SixMonths = 182,
  Year = 365
}

@Schema({ optimisticConcurrency: true })
export class NodeBadgeMetadata {

  @Prop({ required: true })
  id: string;

  // on a roll start date, when we are counting from
  @Prop()
  rollStartDate: number = null;

  @Prop()
  lastOnRollDays: number = 0

  @Prop()
  successfulPingDates: number[] = [];

  @Prop()
  lastAchievedOnARollBadgeCount: number = 0;

  @Prop()
  uptimeBadgeAwarded: boolean = false;

}

export const NodeBadgeMetadataSchema = SchemaFactory.createForClass(NodeBadgeMetadata);
