import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_test/screens/home.dart';
import 'package:firebase_test/services/auth_service.dart';
import 'package:flutter/material.dart';
import 'package:flutter_signin_button/flutter_signin_button.dart';

class Login extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    Future<UserCredential> user;
    return Scaffold(
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              (
                SignInButton(
                  Buttons.Facebook,
                  onPressed: () => {
                        user = loginFacebook(),
                        Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (context) => Home(user)))
                      }
                  )
              )
            ],
          ),
        )
    );
  }
}
