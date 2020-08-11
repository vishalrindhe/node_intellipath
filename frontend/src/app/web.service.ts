import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  readonly ROOT_URL;

  constructor(private http: HttpClient ) {
    this.http 
    this.ROOT_URL = "http://localhost:3000"; 
   }

   get(uri: string){
     return this.http.get(`${this.ROOT_URL}/${uri}`);
   }

   post(uri: string, payload: Object){
    return this.http.get(`${this.ROOT_URL}/${uri}`, payload);
  }

  put(uri: string, payload: Object){
    return this.http.get(`${this.ROOT_URL}/${uri}`, payload);
  }

  delete(uri: string){
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }
}
