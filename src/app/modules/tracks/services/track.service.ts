import { Injectable } from '@angular/core';
import {  Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { TrackModel } from '@core/models/tracks.model';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly URL = environment.api;

  constructor(private httpClient:HttpClient) {

   }

   private skipById(listTracks:TrackModel[], id:number): Promise<TrackModel[]>{
     return new Promise((resolve, reject) =>{
       const listTmp = listTracks.filter(a => a._id !== id)
       resolve(listTmp)
     })
   }

  //  `
   getAllTracks$(): Observable<any> {
     return this.httpClient.get(`${this.URL}/tracks`)
     .pipe(
       map(({data}:any)=>{
         return data
       })
     )
   }

  //  @return DEVOLVER CANCIONES RANDOM
  getAllTracksRandom$(): Observable<any> {
    return this.httpClient.get(`${this.URL}/tracks`)
    .pipe(
      mergeMap(({ data }: any) => this.skipById(data,2)),
      tap(data => console.log('Estoy dentro del pipe',data)),
      catchError((err) => {
        const {status, statusText} = err;
        console.log('Algo paso revisame !!!', [status, statusText])
        return of([]);
      })
    )
  }
}
