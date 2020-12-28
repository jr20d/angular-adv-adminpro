import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme');
  private links: NodeListOf<Element> | any;

  constructor() {
    const url: string = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.linkTheme?.setAttribute("href", url);
  }

  set setLinks(links: NodeListOf<Element> | any){
    this.links = links;
  }

  changeTheme(theme: string){
    const url: string = `./assets/css/colors/${theme}.css`;
    localStorage.setItem('theme', url);
    this.linkTheme?.setAttribute("href", url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme(): void{
    this.links.forEach((elem: { classList: {remove: (args: string) => void, add: (args: string) => void}; getAttribute: (args: string) => any; }) => {
      elem.classList.remove('working');
      const theme = elem.getAttribute('data-theme');
      const themeUrl: string = `./assets/css/colors/${theme}.css`;
      if (themeUrl === this.linkTheme?.getAttribute('href')){
        elem.classList.add('working');
      }
    });
  }
}
