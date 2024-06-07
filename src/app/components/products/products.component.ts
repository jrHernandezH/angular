import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { FormControl, FormGroup } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  productDetail: any;
  viewDetail: boolean = true;
  datosFiltrar: FormGroup;
  tiposProductos: string[] = []; // Variable para almacenar los tipos únicos de productos
  origenesProductos: string[] = [];
  isClient:boolean = false;

  constructor(private productService: ProductsService, private cartS: CartService, private msg:MessageService) {
    this.datosFiltrar = new FormGroup({
      nombre: new FormControl(''),
      tipo: new FormControl(''),
      origen: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products) => {
        console.log('Productos obtenidos:', products);
        this.products = products.productos;
        this.filteredProducts = [...this.products];
        this.obtenerOrigenesProductos(); 
        this.obtenerTiposProductos(); // Llamar a la función para obtener los tipos de productos únicos
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );

    

    this.datosFiltrar.valueChanges.subscribe((value: any) => {
      this.aplicarFiltros(value);
    });
  }

  getProduct(productU: any) {
    this.productDetail = productU;
    console.log(this.productDetail);
    this.viewDetail = false;
  }

  aplicarFiltros(filtros: any) {
    this.filteredProducts = this.products.filter(product => {
      let cumpleFiltro = true;
      if (filtros.nombre && !product.nombre.toLowerCase().includes(filtros.nombre.toLowerCase())) {
        cumpleFiltro = false;
      }
      if (filtros.tipo && product.tipo !== filtros.tipo) {
        cumpleFiltro = false;
      }
      if (filtros.origen && product.origen !== filtros.origen) {
        cumpleFiltro = false;
      }
      return cumpleFiltro;
    });
  }

  obtenerTiposProductos() {
    // Extraer tipos únicos de productos y almacenarlos en la variable tiposProductos
    this.tiposProductos = Array.from(new Set(this.products.map(product => product.tipo)));
  }
  obtenerOrigenesProductos() {
    // Extraer orígenes únicos de productos y almacenarlos en la variable origenesProductos
    this.origenesProductos = Array.from(new Set(this.products.map(product => product.origen)));
  }
  
  closedDetail() {
    this.viewDetail = true;
    this.productDetail = null;
  }
  addToCart(product: any) {
    this.cartS.addToCart(product);
    console.log('Producto añadido al carrito:', product);
    this.msg.add({ severity: 'success', summary: 'Carrito', detail: 'Producto agregado al carrito' });
    this.closedDetail();
  }

 
}
