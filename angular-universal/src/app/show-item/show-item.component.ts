import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrls: ['./show-item.component.scss']
})
export class ShowItemComponent {

  id = '';

  constructor(private route: ActivatedRoute, private meta: Meta) {
    this.id = this.route.snapshot.params['id'];
    this.addTags();
  }

  addTags() {
    this.meta.removeTag("name='og:image'");
    this.meta.removeTag("name='og:image:alt'");
    this.meta.removeTag("name='og:title'");
    this.meta.removeTag("name='og:description'");
    this.meta.addTag({ name: 'og:image', content: `http://dell-g15.local/assets/${this.id}.png` });
    this.meta.addTag({ name: 'og:image:alt', content: this.id });
    this.meta.addTag({ name: 'og:title', content: this.id });
    this.meta.addTag({ name: 'og:description', content: this.id });
  }

}
