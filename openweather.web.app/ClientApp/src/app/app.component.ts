import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface NameGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  myForm: FormGroup;
  constructor(private _formBuilder: FormBuilder) { }
  nameGroups: NameGroup[] = [{
    letter: 'A',
    names: ['Amelia', 'Alfie', 'Ava', 'Archie']
  },
  {
    letter: 'B',
    names: ['Brooke', 'Bethany', 'Beatrice']
  },
  {
    letter: 'C',
    names: ['Christopher', 'Caleb', 'Cameron', 'Charles']
  }, {
    letter: 'D',
    names: ['Daniel', 'Daisy']
  }, {
    letter: 'F',
    names: ['Freya', 'Florence', 'Francesca']
  }, {
    letter: 'G',
    names: ['Greyson', 'George']
  }, {
    letter: 'H',
    names: ['Harry', 'Harrison', 'Hannah']
  }, {
    letter: 'I',
    names: ['Idaho', 'Illinois', 'Indiana', 'Iowa']
  }
  ];

  dataGroupOptions: Observable<NameGroup[]>;



  ngOnInit(): void {
    this.myForm = this._formBuilder.group({
      namesGroup: '',
    });

    this.dataGroupOptions = this.myForm.get('namesGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
  }

  private _filterGroup(value: string): NameGroup[] {
    if (value) {
      return this.nameGroups
        .map(group => ({ letter: group.letter, names: _filter(group.names, value) }))
        .filter(group => group.names.length > 0);
    }

    return this.nameGroups;
  }
  title = 'app';
}
