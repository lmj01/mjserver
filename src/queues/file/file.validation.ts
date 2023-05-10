import { PipeTransform, ArgumentMetadata } from "@nestjs/common";

export class FileSizeValidationPipe implements PipeTransform {
    transform(value: any, metdata: ArgumentMetadata) {
        const oneKb = 1024;
        const oneMb = oneKb * oneKb;
        return value.size < oneMb;
    }
}