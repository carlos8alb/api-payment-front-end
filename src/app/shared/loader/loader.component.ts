import { Component, OnInit } from '@angular/core';
import { faSpinner, fas, faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styles: [
  ]
})
export class LoaderComponent implements OnInit {

  faSpinner = faSpinner;

  constructor() { }

  ngOnInit(): void {
  }

}
