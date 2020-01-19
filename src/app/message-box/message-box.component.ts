import { Component, OnInit } from '@angular/core';
import { firestore } from '../../firebase/firebase';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    firestore
      .collection('messages')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(doc => {
          // console.log(doc.data());
        });
      });
  }
}
