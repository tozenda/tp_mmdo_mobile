import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
interface item {
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
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
