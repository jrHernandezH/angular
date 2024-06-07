import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { ImageService } from '../../services/image.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  dropdownItems: MenuItem[];
  marcas: MenuItem[];
  categorias: MenuItem[];
  origenes: MenuItem[];
  tipos: MenuItem[];
  coverPhotos: string[] = ['', '', ''];
  idProducto: Number = 0;

  constructor(private prudctS: ProductsService, private imgS:ImageService, private msg:MessageService) {
    this.dropdownItems = [
      { label: 'Edit', icon: 'pi pi-pencil' },
      { label: 'View', icon: 'pi pi-eye' }
    ];
    this.marcas = [
      { label: 'Marca A', value: 'marcaA' },
      { label: 'Marca B', value: 'marcaB' },
      // Add more options as needed
    ];

    this.categorias = [
      { label: 'Categoría A', value: 'categoriaA' },
      { label: 'Categoría B', value: 'categoriaB' },
      // Add more options as needed
    ];

    this.origenes = [
      { label: 'Nacional', value: 'nacional' },
      { label: 'Internacional', value: 'internacional' }
    ];

    this.tipos = [
      { label: 'Tipo A', value: 'tipoA' },
      { label: 'Tipo B', value: 'tipoB' },
      // Add more options as needed
    ];
  }

  dataForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    precio: new FormControl(0.0, [Validators.required]),
    stock: new FormControl(0, [Validators.required]),
    marca: new FormControl('', [Validators.required]),
    categoria: new FormControl('', [Validators.required]),
    origen: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    proveedor: new FormControl('', [Validators.required])
  });

  getData(){
    const formData = { ...this.dataForm.value };
    formData.marca = (formData.marca as any).value;
    formData.categoria = (formData.categoria as any).value;
    formData.origen = (formData.origen as any).value;
    formData.tipo = (formData.tipo as any).value;
    
    if(this.dataForm.valid && this.coverPhotos.some(photo => photo)) {
      this.prudctS.setProduct(formData).subscribe(
        response => {
          this.idProducto=response.id;
          this.setImages();
        },
        error => {
          console.error(error);
        }
      );
    } else {
      console.error('El formulario no es válido o no se ha agregado ninguna imagen.');
    }
  }
  

  setImages(){
    this.coverPhotos.forEach((photo: string, index: number) => {
      if (photo) {
        const file = this.dataURItoFile(photo, `photo_${index}.png`); // Convierte la imagen en un archivo File
        this.imgS.uploadImageP(file).subscribe(
          response => {
            const image = { producto_id: this.idProducto, imagen_url: response.url}
            this.imgS.setImage(image).subscribe(
              res => {
                this.msg.add({ severity: 'success', summary: 'Success', detail: 'Producto agregado correctamente' });
                // Reiniciar el formulario
                this.dataForm.reset();
                // Reiniciar las imágenes
                this.coverPhotos = ['', '', ''];
              },
              err => {
                this.msg.add({ severity: 'Error', summary: 'Error', detail: 'Error al agregar el producto' });
                console.error('Error al agregar la imagen:', err);
              }
            );
          },
          error => {
            console.error('Error al subir la imagen:', error);
          }
        );
      }
    });
}

  
  // Método para convertir una URL de datos en un objeto File
  dataURItoFile(dataURI: string, fileName: string) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: mimeString });
    const file = new File([blob], fileName, { type: mimeString });
    return file;
  }
  

  onFileSelected(event: any, index: number) {
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onloadend = () => {
      this.coverPhotos[index] = reader.result as string;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }
}
