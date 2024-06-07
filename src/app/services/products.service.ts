import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost/candyStoreRest/src/controllers/Productos.php'; 

  constructor(private http: HttpClient) { }

  setProduct(producto:any){
    return this.http.post<any>(this.apiUrl, producto);
  }

  getProducts(){
    return this.http.get<any>(this.apiUrl);
  }
}
