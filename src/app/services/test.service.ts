import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from '../config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  servetUrl: string = GLOBAL.servetUrl;

  constructor( public http: HttpClient ) { }

  async createPreference(body): Promise<any> {
    const url = this.servetUrl + '/preference';
    const result = await this.http.post(url, body).pipe(map(resp => resp)).toPromise();
    return result;
  }

}
