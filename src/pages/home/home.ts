import { Component } from '@angular/core';
import { DetailsPage } from '../details/details';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription'
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { AlertController } from 'ionic-angular';
import { api_key } from '../../app/tmdb';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { Shake } from '@ionic-native/shake';

interface item {
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  results: Observable<item[]>;
  query: string = "";
  aboutDetails = DetailsPage;
  item : item;
  private shakeSubscription: Subscription;

  constructor(private httpClient: HttpClient, private alertCtrl: AlertController, private navCtrl : NavController, private shake : Shake){
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

  //?api_key=ebb02613ce5a2ae58fde00f4db95a9c1&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2018

  discoverMovies():Observable<item[]>{
    return this.httpClient.get<item[]>("https://api.themoviedb.org/3/discover/movie", {
      params: new HttpParams().set("api_key", api_key).set("language", "fr-FR").set("sort_by", "popularity").set("primary_release_year","2018")
    }).pluck("results")
  }

  showRandomMovieAlert(movies: item[]): void{
    //let list : Observable<item[]> = this.discoverMovies();
    var item = movies[Math.floor(Math.random() * movies.length)];
    this.showConfirm(item);
  }

  showConfirm(item : item) {
    let confirm = this.alertCtrl.create({
      title: item.title+' ?',
      message: item.overview,
      buttons: [
        {
          text: 'Annuler'
        },
        {
          text: 'Plus',
          handler: () => {
            this.navCtrl.push(DetailsPage,{currentItem : item});
          }
        }
      ]
    });
    confirm.present();
  }

  ionViewDidEnter() {
    this.shakeSubscription = this.shake.startWatch()
        .switchMap(() => this.discoverMovies())
        .subscribe(movies => this.showRandomMovieAlert(movies))
  }
  ionViewWillLeave() {
    this.shakeSubscription.unsubscribe();
  }
}
