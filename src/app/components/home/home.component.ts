import { Component, OnInit } from '@angular/core';
import { Item } from '../../model/Item';
import {ApiService} from '../../service/api.service';
import {MatDialog} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showFiller = false;
  items:Item[] = [];

  constructor(public dialog: MatDialog, private _apiservice: ApiService, private _router: Router) { }

  ngOnInit(): void {

   this.getAllitems();
      
  }

  getAllitems()
  {
    this.items = [];

    this._apiservice.getAllItems().subscribe(
      (res) => {
        this.items = res;
      }, (error) => {
        console.log(error);
      });

  }

  newItemButton()
  {
    this.dialog.open(DialogElements,{disableClose:true});
  }

  logout()
  {
    this._router.navigate(["login"]);
  }

  deleteItemButton(id)
  {
    this._apiservice.deleteItem(id).subscribe(
      (res) => {
        console.log("Item deleted!");
        console.log(id);

      }, (error) => {
        console.log(error);
      });

      this.getAllitems();
  }

  BuyButton(item:Item)
  {
    item.quantity -= 1;

    if(item.quantity < 0)
    {
      item.quantity = 0;
    }

    this._apiservice.updateItem(item._id,item).subscribe(
      (res) => {
        console.log("Item Updated");

      }, (error) => {
        console.log(error);
      });

      this.getAllitems();
    
  }

  RefillButton(item)
  {
    item.quantity +=1;

    this._apiservice.updateItem(item._id,item).subscribe(
      (res) => {
        console.log("Item Updated");

      }, (error) => {
        console.log(error);
      });

      this.getAllitems();


  }



  
}

@Component({
  selector: 'dialog-elements',
  templateUrl: 'dialog-elements.html',
})
export class DialogElements{

  constructor(private _apiservice: ApiService,public dialog: MatDialog){}

  newItemForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    itype: new FormControl('',[Validators.required]),
    quantity: new FormControl(1),
    image: new FormControl('https://www.freeiconspng.com/uploads/no-image-icon-4.png')
  })


  createNewItemButton()
  {
    if(this.newItemForm.valid)
    {
      this._apiservice.createItem(this.newItemForm.value).subscribe(
        (res) => {
          console.log("Item Created!");

        }, (error) => {
          console.log(error);
        });

      this.dialog.closeAll()
    }

    else
    {
      console.log("Invalid form!")
    }
  }

}
