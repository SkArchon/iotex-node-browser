import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NodeUserAccount, NodeUserAccountSchema } from './schemas/node-user-account.schema';
import { NodeController } from './controllers/node.controller';
import { NodeService } from './services/node.service';
import { MongoService } from './services/mongo.service';
import { Web3Service } from './services/web3.service';
import { NodeEntry, NodeEntrySchema } from './schemas/node-entry.schema';
import { SchedulerService } from './services/scheduler.service';
import { NodeProcessedEntry, NodeProcessedEntrySchema } from './schemas/node-processed-entry.schema';
import { NodeProcessedController } from './controllers/node-processed.controller';
import { NodeProcessedService } from './services/node-processed.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './services/mail.service';
import { IpLocationService } from './services/ip-location.service';
import { NodeRequestDetailsProcessorService } from './services/node-request-details-processor.service';
import { NodeBadgeMetadata, NodeBadgeMetadataSchema } from './schemas/node-badge-metadata';
import { BadgesService } from './services/badges.service';

const MONGODB_URL = "mongodb+srv://newuser:Password1234@cluster0.stslp.mongodb.net/iotex-nodes?retryWrites=true&w=majority";

@Module({
  imports: [
    HttpModule,
    MongooseModule.forRoot(MONGODB_URL),
    MongooseModule.forFeature([
      {
        name: NodeUserAccount.name,
        schema: NodeUserAccountSchema,
        collection: 'user_accounts'
      },
      {
        name: NodeEntry.name,
        schema: NodeEntrySchema,
        collection: 'node_entries'
      },
      {
        name: NodeProcessedEntry.name,
        schema: NodeProcessedEntrySchema,
        collection: 'node_processed_entries'
      },
      {
        name: NodeBadgeMetadata.name,
        schema: NodeBadgeMetadataSchema,
        collection: 'node_badge_metadata'
      }
      
    ]),
    MailerModule.forRoot({
      transport: {
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "a9e677709b8525",
          pass: "8251db195556cd"
        },
      },
      defaults: {
        from: 'iotex.node.manager@gmail.com',
      },
      template: {
        dir: join(__dirname, 'email-templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController, NodeController, NodeProcessedController],
  providers: [
    AppService,
    NodeService,
    MongoService,
    Web3Service,
    SchedulerService,
    NodeProcessedService,
    MailService,
    IpLocationService,
    NodeRequestDetailsProcessorService,
    BadgesService
  ],
})
export class AppModule {}
