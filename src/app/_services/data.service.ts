import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DataService {
    constructor(private http: HttpClient) {
        
    }

    //Http get webservice function
    httpGet(serviceUrl: string) {
        return this.http.get(serviceUrl)
            .pipe(map(response => response));
    }

    //Http Post Webservice function
    httpPost(serviceUrl: string, postData) {
        const headers = new HttpHeaders();
        // headers.append('Access-Control-Allow-Headers', 'Content-Type');
        // headers.append('Access-Control-Allow-Methods', 'POST');
        headers.append('Access-Control-Allow-Origin', '*');
       // headers.append('Content-Type', 'application/json');
        return this.http.post(serviceUrl, postData)
            .pipe(map(response => response));
    }
}