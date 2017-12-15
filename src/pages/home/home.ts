import { Component } from '@angular/core';
import { DetailsPage } from '../details/details';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';
import { api_key } from '../../app/tmdb';

interface item {
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
}

//const i: item = { title: 'Lorem Ipsum', release_date: "01/01/1990", poster_path : "https://placeimg.com/50/50/any", overview :"Lorem Ipsum sim dolor amet"};

const items: item[] = [];

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  results: Observable<item[]>;
  query: string = "";
  aboutDetails = DetailsPage;
  item : item;
  constructor (private httpClient : HttpClient){

  }
  onInput() {
    if (this.query === "") {
      this.results = Observable.of([]);
    }
    else{
      this.results = this.fetchResults();
    }
  }
  fetchResults():Observable<item[]>{
    return this.httpClient.get<item[]>("https://api.themoviedb.org/3/search/movie",{
      params: new HttpParams().set("api_key",api_key).set("query",this.query)
    }).pluck("results")
  }
}
