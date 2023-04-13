import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BACKEND_URL = 'http://localhost:8080/upload';

@Component({
  selector: 'app-root',
  template: `
    <input type="file" id="customFile" accept="image/png, image/jpeg" (change)="choosedFile($event)"><br>
    <label for="customFile" id="chooseFile">Selecione o arquivo</label><br>
    <button (click)="onSubmit()" [disabled]="files.size === 0">Upload</button>
  `,
  styles: []
})
export class AppComponent {
  files: Set<File> = new Set;

  constructor(private http: HttpClient) { }

  choosedFile(e: Event) {
    const selectedFiles = Array.from((<FileList>(<HTMLInputElement>e.target).files));
    const filesName = selectedFiles.map(f => {
      this.files.add(f);
      return f.name;
    }).join(', ');
    console.log((<any>document.getElementById('chooseFile')).innerHTML);
    (<any>document.getElementById('chooseFile')).innerHTML = filesName;
  }

  onSubmit() {
    if (this.files.size > 0) {
      const formData = new FormData();
      this.files.forEach(f => formData.append('file', f, f.name));
      this.http.post(BACKEND_URL, formData, { observe: 'events', reportProgress: true })
        .subscribe((res) => console.log(res));
    }
  }
}
