import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {NotificationService} from "../../shared/notification.service";
import * as firebase from 'firebase';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private notifier: NotificationService) { }

  ngOnInit() {   }

  onSubmit(form:NgForm){
  	const email = form.value.email;
  	const password = form.value.password;

  	firebase.auth().signInWithEmailAndPassword(email,password)
  	.then(userData =>{
  		var user = firebase.auth().currentUser;
  		if(user.emailVerified){
  			console.log("Next");
  		}else {
  			const message= "Your email is not yet verified";
  			this.notifier.display('error',message);
  			firebase.auth().signOut();
  		}
  	})
  }
}
