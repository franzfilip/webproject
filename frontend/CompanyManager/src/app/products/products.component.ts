import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(private router: Router, private authService: AuthService, public dialog: MatDialog) { }

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

  deleteClick(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const server = 'http://localhost:5000/graphql';

        let serverQuery = {
          query: `mutation {
            deleteProduct(productId: ${id})
          }
          `
        }

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', server);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', this.authService.jwtoken);
        let context = this;
        xhr.onload = function () {
          setTimeout(() => { context.fetchProducts(); }, 1000);
        }.bind(context);

        xhr.send(JSON.stringify(serverQuery));
      }
    });
  }

}

@Component({
  selector: 'delete-dialog',
  templateUrl: './delete-dialog.html',
})
export class DeleteDialog {}