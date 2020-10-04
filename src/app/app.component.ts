import { Component, OnInit, AfterContentInit } from '@angular/core';
import { TestService } from './services/test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentInit {

  loader;

  constructor(
    private testService: TestService
  ) { }


  ngOnInit(): void {
    this.loader = true;
  }

  ngAfterContentInit(): void {
    this.loader = false;
  }

  async createPreference(): Promise<any> {
    try {
      this.loader = true;

      const body = {
        items: [
          { id: 1, title: 'Alumbrado', description: 'Alumbrado Agosto 2020', quantity: 1, unit_price: 150 },
          { id: 2, title: 'Barrido', description: 'Barrido Agosto 2020', quantity: 1, unit_price: 350 }
        ],
        payer: {
          name: 'Juan',
          surname: 'Perez',
          email: 'jperez@gmail.com',
          date_created: '',
          identification: {
            type: 'DNI',
            number: '33749449'
          },
          address: {
            street_name: 'Belgrano',
            street_number: 1500,
            zip_code: '4200'
          }
        },
        external_reference: 'API Payments'
      };

      const preference = await this.testService.createPreference(body);
      window.location.href = preference.init_point;
    } catch (error) {
      this.loader = false;
      console.log(error);
    }
  }

}
