import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../service/settings.service';
import { SidebarService } from '../service/sidebar.service';

declare function customInitFunctions(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor( private settingService: SettingsService, private sidebarService: SidebarService) { }

  ngOnInit(): void {
    customInitFunctions();
    this.sidebarService.cargarMenu();
  }

}
