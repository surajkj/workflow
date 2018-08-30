import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') == "True"){
            return next.handle(req.clone());
        }
            

        if (localStorage.getItem('userToken') != null) {
            const clonedreq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + localStorage.getItem('userToken'))
            });
            return next.handle(clonedreq)
                .pipe(
                    tap(event => {
                        // if (event instanceof HttpResponse) {
                        //     const elapsed = Date.now() - started;
                        //     console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
                        // }
                    }, error => {
                        console.error('NICE ERROR', error);
                        if (error.status === 401)
                            this.router.navigateByUrl('/login');
                    })
                );
        }
        else {
            this.router.navigateByUrl('/login');
        }
    }
}