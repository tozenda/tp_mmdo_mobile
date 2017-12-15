import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

interface item {
  title: string;
  author: string;
  date: string;
  image: string;
}

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})

export class DetailsPage {
  itemToDescribe : item;
  constructor(private navParams: NavParams) {
    this.itemToDescribe = this.navParams.get("currentItem");
  }

}
