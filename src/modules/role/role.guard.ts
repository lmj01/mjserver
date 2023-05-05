import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        // const requiredRole = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
        //     context.getHandler(),
        //     context.getClass(),
        // ]);
        // if (!requiredRole) {
        //     return true;
        // }
        // const { user } = context.switchToHttp().getRequest();
        // console.log('role guard', requiredRole, user)
        // return requiredRole.some((r) => user.roles!.includes(r));
        return true;
    }
}