import { Injectable } from '@angular/core';
import List from 'src/app/models/list';
import Task from 'src/app/models/task';
import { TaskService } from 'src/app/task.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WebService {
  readonly ROOT_URL;
  constructor(private http: HttpClient ) {
    this.ROOT_URL = "http://localhost:3000"; 
   }
   // URI can be a name, locator, or both for an online resource where a URL is just the locator.
   // URLs are a subset of URIs.
   get(uri: string){
     return this.http.get(`${this.ROOT_URL}/${uri}`);
   }

   post(uri: string, payload: Object){
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  patch(uri: string, payload: Object){
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  }

  delete(uri: string){
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }
}
