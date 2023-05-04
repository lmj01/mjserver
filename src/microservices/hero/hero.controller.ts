import { HeroById } from "./interfaces/heroById.interface";
import { Observable, ReplaySubject, Subject, toArray } from 'rxjs';
import { Hero } from "./interfaces/hero.interface";
import { OnModuleInit, Controller, Inject, Get, Param } from "@nestjs/common";
import { ClientGrpc, GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { HERO_SERVICE, HERO_PACKAGE } from "../constants";
import { ApiTags, ApiOkResponse } from "@nestjs/swagger";
import { HeroResponse } from "./hero.vo";

interface HeroService {
    findOne(data: HeroById): Observable<Hero>;
    findMany(upstream:Observable<HeroById>):Observable<Hero>;
}

@ApiTags('Hero')
@Controller('hero')
export class HeroController implements OnModuleInit {
    private readonly items: Hero[] = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Doe' },
    ];
    private heroService: HeroService;

    constructor(@Inject(HERO_PACKAGE) private readonly client: ClientGrpc){}

    onModuleInit() {
        this.heroService = this.client.getService<HeroService>(HERO_SERVICE);
        console.log('hero module started')
    }

    @ApiOkResponse({description: '返回英雄', type: HeroResponse})
    @Get() 
    getMany():Observable<Hero[]> {
        const ids$ = new ReplaySubject<HeroById>();
        ids$.next({ id: 1 });
        ids$.next({ id: 2 });
        ids$.complete();

        const stream = this.heroService.findMany(ids$.asObservable());
        return stream.pipe(toArray());
    }
    
    @ApiOkResponse({description: '返回英雄', type: HeroResponse})
    @Get(':id')
    getById(@Param('id') id: string): Observable<Hero> {
        return this.heroService.findOne({ id: +id });
    }

    @GrpcMethod(HERO_SERVICE)
    findOne(data: HeroById): Hero {
        return this.items.find(({id}) => id === data.id);
    }

    @GrpcStreamMethod(HERO_SERVICE)
    findMany(data$: Observable<HeroById>): Observable<Hero> {
        const hero$ = new Subject<Hero>();

        const onNext = (heroById: HeroById) => {
            const item = this.items.find(({id})=>id == heroById.id);
            hero$.next(item);
        };
        const onComplete = () => hero$.complete();
        data$.subscribe({
            next: onNext,
            complete: onComplete,
        })

        return hero$.asObservable();
    }
}