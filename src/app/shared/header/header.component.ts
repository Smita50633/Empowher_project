import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  filtersForm!: FormGroup;
categories = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Clothing' },
  { id: 3, name: 'Books' },
  { id: 4, name: 'Home Appliances' }
];


  @Output() filtersChanged = new EventEmitter<any>();

  constructor(private fb: FormBuilder,private router: Router) {}

  ngOnInit(): void {
    this.filtersForm = this.fb.group({
      searchText: [''],
      selectedCategory: [''],
      maxPrice: [5000],
      sortBy: ['']
    });

    // emit automatically when any filter changes
    this.filtersForm.valueChanges.subscribe(values => {
      this.emitFilters(values);
    });
  }

  applyFilters() {
    this.emitFilters(this.filtersForm.value);
  }

  private emitFilters(values: any) {
    console.log('Filters emitted:', values);  
    this.filtersChanged.emit(values);
  }
  goToCart() {
    this.router.navigate(['/customer/cart']);
  }
}
