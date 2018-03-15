import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


@Injectable()
export class ApiService {
    url: string = "http://titfxservices.titcs.com.br/api/v1/barcode/readfromimage";

    constructor(private http: Http) { }

    upload(image: FormData) {
        return this.http.post(`${this.url}`, image, new RequestOptions({
            headers: new Headers
                ({
                    'Accept': 'application/json'
                })
        }));
    }
}