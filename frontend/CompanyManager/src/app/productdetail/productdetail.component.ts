import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../model/product';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {

  product: product = new product();

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];

    if (id !== 0)
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
    var context = this;
    xhr.onload = function () {
        console.log('data returned:', xhr.response);
        context.product = xhr.response.data.product;
    }.bind(context);

    xhr.send(JSON.stringify(serverQuery));
  }

  saveProduct(): void {
    if (this.product.id === 0) {
      //create
    } else {
      // update
    }
  }

}
