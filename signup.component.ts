import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import * as firebase from 'firebase';
import {NotificationService} from "../../shared/notification.service";


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
	public message="";	
  constructor(private notifier: NotificationService) { }

  ngOnInit() {
  }

  onSubmit(form:NgForm){
  	const fullname = form.value.fullname;
  	const email = form.value.email;
  	const password  = form.value.password;
  	console.log(fullname,email,password);
  
  	firebase.auth().createUserWithEmailAndPassword(email,password)
	.then(userData => {
		console.log(userData);
		//userData.sendEmailVerification();
		var user = firebase.auth().currentUser;

		user.sendEmailVerification().then(function() {
		  // Email sent.
		  console.log("Email Send");
		  
		  
	}).catch(function(error) {
		  console.log(error);
	});
	console.log(email);
	this.message="A verification email has been sent to".concat(email).concat(", kindly check your inbox");
	this.notifier.display('success',this.message);
		return firebase.database().ref('users/'+user.uid).set({
		email:email,
		uid: user.uid,
		registration: new Date().toString(),
		name:fullname
		}).then( ()=>{
			firebase.auth().signOut();
		});
	})
	.catch( err=>{
		this.notifier.display('error',err.message)
		console.log("Error msg:");
		console.log(err);
	})
	
  }
}
