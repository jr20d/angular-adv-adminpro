import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/service/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  private _menuItems: any;

  constructor(private sidebarService: SidebarService) {
    this._menuItems = this.sidebarService.menu;
  }

  ngOnInit(): void {
  }

  get menuItems(): any[]{
    return this._menuItems;
  }
}
