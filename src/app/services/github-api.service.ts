import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, retry, catchError, mergeMap } from 'rxjs/operators';
import { USERS} from '../../environments/environment';
import { IRepositorios, Repositorios } from '../models/Repositories';


@Injectable({
  providedIn: 'root'
})
export class GithubApiService {

  constructor(private http: HttpClient) { }


  getReposByUsername(username: string): Observable<IRepositorios[]>{
   
    return this.http.get<IRepositorios[]>(USERS.BASE_URL + username + "/repos")
    .pipe(map((repos: Repositorios[]) => repos.map(repo => new Repositorios(repo))))
}
}
