import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent {

  constructor(private meta: Meta) {
    this.addTags();
  }

  addTags() {
    this.meta.removeTag("name='og:image'");
    this.meta.removeTag("name='og:image:alt'");
    this.meta.removeTag("name='og:title'");
    this.meta.removeTag("name='og:description'");
    this.meta.addTag({ name: 'og:image', content: 'http://dell-g15.local/assets/demo.png' });
    this.meta.addTag({ name: 'og:image:alt', content: 'DEMO' });
    this.meta.addTag({ name: 'og:title', content: 'DEMO' });
    this.meta.addTag({ name: 'og:description', content: 'DEMO' });
  }

}
