import { Injectable } from '@angular/core';
import {HttpInterceptor,HttpRequest, HttpHandler,HttpEvent } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { UserService } from '../shared/user.service'
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private userService:UserService,private router:Router){}
    intercept(req:HttpRequest<any>,next:HttpHandler){
               if(req.headers.get('noAuth')){
                 return next.handle(req.clone());
        }
        else{
            const clonereq=req.clone({
                headers:req.headers.set("Authorization","Bearer "+this.userService.getToken())
            });
            return next.handle(clonereq).pipe(
                tap(
                    event=>{},
                    err=>{
                        if(err.error.auth==false){
                            this.router.navigate(['/login']);
                        }
                    }
                )
            );
        }   
    }
}