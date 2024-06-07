import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = 'http://localhost/candyStoreRest/src/controllers/CargarAvatar.php'; 
  private apiUrl2 ='http://localhost/candyStoreRest/src/controllers/CargarImagen.php'; 
  private apiUrl3 ='http://localhost/candyStoreRest/src/controllers/Imagen.php'; 

  constructor(private http: HttpClient) { }

  uploadImage(image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', image, image.name);
    return this.http.post<any>(this.apiUrl, formData);
  }
  uploadImageP(image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', image, image.name);
    return this.http.post<any>(this.apiUrl2, formData);
  }
  setImage(image:any){
    return this.http.post<any>(this.apiUrl3, image);
  }
}
