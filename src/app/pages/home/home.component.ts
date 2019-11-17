import { ScriptLoaderService } from './../../services/script-loader.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(private _script: ScriptLoaderService) { }

  ngOnInit() {
    // this._script.loadScripts('app-index',['assets/app/js/dashboard.js']);

  }

}
