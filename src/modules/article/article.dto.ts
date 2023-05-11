import { PartialType } from "@nestjs/swagger";

export class ArticleDtoCreate {
    title: string;
    content: string;
    createTime: Date;
    updateTime: Date;
    isPublish: boolean;
    isDelete: boolean;
}

export class ArticleDtoUpdate extends PartialType(ArticleDtoCreate) {
}

export class ArticleDtoFind {
    id: string;
}