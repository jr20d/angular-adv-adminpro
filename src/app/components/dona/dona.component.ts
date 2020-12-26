import { Component, Input, OnInit } from '@angular/core';
import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {
  @Input() public title: String = "Sin titulo";
  @Input() public labels: Label[] = ['Label 1', 'Label 2', 'Label 3'];
  @Input() public data: MultiDataSet = [
    [350, 450, 100]
  ];

  @Input() public colors: Color[] = [
    {backgroundColor: ['#6857E6', '#009FEE', '#F02059']}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
