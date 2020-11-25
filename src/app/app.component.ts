import { Component } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rebelapp';
  private items: any;
  private Imageitems: any;
  private start: number;
  private last: number;
  private total: number;
  loadItems: any;
  constructor(private http: HttpService) {
    this.start = 0;
    this.last = 20;
    // service call to get the beer details
    this.http.getBeerDetailsCall().subscribe((resp) => {
      if (resp) {
        this.items = resp;
        this.total = resp.length;
        this.http.getBeerImageDetailsCall().subscribe((res) => {
          if (res) {
            this.Imageitems = res;
            let i = 0;
            this.items.forEach(element => {
              element.image = this.Imageitems[i % 5].image;
              i++;
            });
            if (i > 20) {
              this.last = 20;
            } else {
              this.last = i;
            }
            this.load();
            console.log(this.items);
          }
        });
      }
    });
  }

  prev(): void {
    const lst = this.last - 20;
    const fst = this.start - 20;
    this.start = (fst) >= 0 ? fst : 0;
    this.last = (lst) >= 20 ? lst : this.start < lst ? lst : this.last;
    this.load();
  }

  load(): void {
    this.loadItems = this.items.slice(this.start, this.last);
  }

  next(): void {
    const lst = this.last + 20;
    const fst = this.start + 20;
    this.start = fst < this.total ? fst : this.start;
    this.last = lst <= this.total ? lst : this.last;
    this.load();
  }

  find(keyword): void {
    keyword = keyword.target.value;
    // search a beer from the list
    let foundIndex = -1;
    for (let i = 0; i < this.total; i++) {
      if ((this.items[i].name).indexOf(keyword) !== -1) {
        foundIndex = i;
        break;
      }
    }
    if (foundIndex !== -1) {
      let fst = foundIndex / 20;
      fst = Math.floor(fst) * 20;
      const lst = fst + 20;
      this.start = fst < this.total ? fst : this.start;
      this.last = lst <= this.total ? lst : this.total;
      this.load();
    }
  }
}
