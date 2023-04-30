import { Component } from "@angular/core";
import { MarioSource } from "./mario-data-source.model";
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.css"],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AppComponent {
  displayColumns = ["id", "name", "function", "expand"];
  expandedRow: MarioSource | null = null;

  dataSource: MarioSource[] = [
    { id: "1", name: "Mario", function: "Player", comment: "He's wear red clothes" },
    { id: "2", name: "Luigi", function: "Player", comment: "He's wear green clothes" },
    { id: "3", name: "Koopa", function: "Enemy", comment: "They are turtles" },
    { id: "4", name: "Yohi", function: "Friend", comment: "He's a dinossaur" }
  ];
}
