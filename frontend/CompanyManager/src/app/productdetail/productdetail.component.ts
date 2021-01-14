import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from '../model/product';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {

  product: product = new product();

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];

    this.fetchProduct(id);
  }

  fetchProduct(id: number): void {
    const server = 'http://localhost:5000/graphql'
    const serverQuery = {
        query: `{
          product(id: ${id}) {
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
        if (xhr.response.data.product !== null)
          context.product = xhr.response.data.product;
    }.bind(context);

    xhr.send(JSON.stringify(serverQuery));
  }

  saveProduct(): void {
    const server = "http://localhost:5000/graphql";
    let serverQuery;

    if (this.product.id === 0) {
      serverQuery = {
        query: `mutation {
          addProduct(companyId: 1, name:\"${this.product.name}\",price:${this.product.price}){
            id
          }
        }
        `
      }
    } else {
      serverQuery = {
        query: ` mutation {
          updateProduct(productId:${this.product.id},name:\"${this.product.name}\",price:${this.product.price}){
            id
          }
        }
        `
      }
    }

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', server);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', this.authService.jwtoken);
    let context = this; 
    xhr.onload = function () {
        console.log('data returned:', xhr.response);
        
        const dialogRef = this.dialog.open(ProductDialog);

        dialogRef.afterClosed().subscribe(result => {
          context.router.navigateByUrl('/products');
        });
    }.bind(context);

    xhr.send(JSON.stringify(serverQuery));
  }

}

@Component({
  selector: 'product-dialog',
  templateUrl: './product-dialog.html',
})
export class ProductDialog {}