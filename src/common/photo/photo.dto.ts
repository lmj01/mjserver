export class PhotoDtoCreate {
    userId: number;
    url: string;
    name: string;
    description: string;
    width: number;
    height: number;
    orientation: string;
    comment: string;
    compressed: boolean;
}