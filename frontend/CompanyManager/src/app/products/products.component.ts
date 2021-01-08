import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../model/product';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: product[];
  displayedColumns: string[] = [ 'id', 'name', 'price', 'action' ];

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    const server = 'http://localhost:5000/graphql'
    const serverQuery = {
        query: `{
          products {
            id
            name
            price
            companyId
          }
        }`
    };

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', server);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', this.authService.jwtoken);
    var context = this;
    xhr.onload = function () {
        console.log('data returned:', xhr.response);
        context.products = xhr.response.data.products;
        console.log(context.products);
    }.bind(context);

    xhr.send(JSON.stringify(serverQuery));
  }

  editClick(id: number): void {
    this.router.navigateByUrl('/products/' + id);
  }

}
