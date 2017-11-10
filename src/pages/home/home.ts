import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgForOf } from '@angular/common';

interface item{
  title:string;
  author:string;
  date:string;
  image:string;
}

const i: item = { title: 'Lorem Ipsum', author: 'moi lol', date: '01/01/1990', image: "https://placeimg.com/50/50/any"};

const items: item[] = [i,i,i,i,i,i,i,i,i,i,i,i];

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  results : item[] = items;
}
