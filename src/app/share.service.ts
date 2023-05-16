import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  apiUrl="http://localhost:3000/data"
  constructor(private http:HttpClient) { }

  getData(){
    return this.http.get(this.apiUrl)
  }

 

  
  setData(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError('An error occurred while saving the data.');
      })
    );
  }

  updatedata(id:any, obj:any){
    return this.http.put("http://localhost:3000/data/"+id,obj)
  }

  deleteData(id:any){
    return this.http.delete("http://localhost:3000/data/"+id)
   }
   
}
