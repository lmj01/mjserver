import { createWriteStream, createReadStream } from 'fs';
import { join } from 'path';
import { Logger } from '@nestjs/common';

export function utilWriteFile(logger:Logger, fileName:string, buffer:Buffer) {
    const path = join(__dirname, '..', '..', 'uploads', fileName);
    logger.log('filePath', path);
    const stream = createWriteStream(path, {
        flags: 'w',
        autoClose: false,
        emitClose: true,
        encoding: 'utf8',
        highWaterMark: 3,
    });
    stream.addListener('finish', (res) => {
        logger.log('writeFinish', res);
        stream.close();
    });
    stream.addListener('error', (res) => {
        logger.error('writeError', res)
    });
    stream.write(buffer);
}

export function utilReadFile(logger:Logger, fileName: string, paths: Array<string>) {
    const path = join(__dirname, ...paths, fileName);
    logger.log('fileReadPath', path);
    const file = createReadStream(path);
    return file;
}