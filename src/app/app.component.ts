import { Component, OnInit, AfterContentInit } from '@angular/core';
import { TestService } from './services/test.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentInit {

  loader;
  form: FormGroup;
  items = [
    { id: 1, title: 'item 1', description: 'description 1', quantity: 1, unit_price: 20 },
    { id: 2, title: 'item 2', description: 'description 2', quantity: 1, unit_price: 30 },
  ];

  constructor(
    private testService: TestService,
    private formBuilder: FormBuilder
  ) {

    this.form = this.formBuilder.group({
      items: new FormArray([])
    });

    this.addCheckboxes();
  }

  ngOnInit(): void {
    this.loader = true;
  }

  ngAfterContentInit(): void {
    this.loader = false;
  }

  get itemsFormArray(): any {
    return this.form.controls.items as FormArray;
  }

  private addCheckboxes(): any {
    this.items.forEach(() => this.itemsFormArray.push(new FormControl(false)));
  }

  async createPreference(): Promise<any> {
    try {
      this.loader = true;

      // const selectedItems = this.form.value.items
      // .map((checked, i) => checked ? this.items[i].id : null)
      // .filter(v => v !== null);
      const body = {
        items: this.items,
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
