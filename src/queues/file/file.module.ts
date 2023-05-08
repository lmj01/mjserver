import { Module } from "@nestjs/common";
import { FileController } from "./file.controller";
import { BullModule } from "@nestjs/bull";
import { queueNameFile } from "../constants";

@Module({
    imports: [
        BullModule.registerQueue({
            name: queueNameFile,
        }),
    ],
    controllers: [FileController],    
})
export class FileModule {}