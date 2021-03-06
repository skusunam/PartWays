import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css'],
})
export class ChildrenComponent implements OnInit {
  items: FirebaseListObservable<any>;
  children: Array<FirebaseObjectObservable<any>>;
  private firebaseDataPath = `/application/${localStorage.getItem('applicationId')}/children`;

  constructor(private route: ActivatedRoute, private af: AngularFire) {
    console.log(this.firebaseDataPath);
    this.items = this.af.database.list(this.firebaseDataPath);
  }

  addChild() {
    if (confirm('Do you want to add new child?')) {
      this.items.push({}).then((item) => {
        this.children.push(this.af.database.object(`${this.firebaseDataPath}/${item.key}`));
      });
    }
  }

  removeChild(id: string) {
    if (confirm('Are you sure?')) {
      this.children[id].remove();
      delete this.children[id];
    }
  }

  ngOnInit() {
    this.children = this.route.snapshot.data['children'];
  }
}
