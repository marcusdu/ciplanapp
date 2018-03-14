import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


@Injectable()
export class ApiService
{
    url:string = "http://titfxservices.titcs.com.br/api/v1/barcode/readfromimage";

    constructor(private http: Http) { }

    upload(image:any)
    {
        // let data = new FormData();
        // data.append('imagem', image[0], image[0]['name']);

        return this.http.post(`${this.url}`,image, new RequestOptions({ headers: new Headers(
            {
                'Content-Type':'multipart/form-data',
                'Accept': 'application/json'
            })}));  
    }
}