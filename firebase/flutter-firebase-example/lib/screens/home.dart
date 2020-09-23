import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_test/screens/login_facebook.dart';
import 'package:firebase_test/services/auth_service.dart';
import 'package:firebase_test/services/crud_service.dart';
import 'package:flutter/material.dart';
import 'package:flutter_signin_button/flutter_signin_button.dart';

class Home extends StatelessWidget {

  Future<UserCredential> userCredential;
  Home(this.userCredential);

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: userCredential,
      builder: (context, snapshot) {
        Widget widget;
        if (snapshot.hasData) {
          widget = Scaffold(
              body: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(snapshot.data.user.displayName,
                      textAlign: TextAlign.center,
                      style: TextStyle(
                          fontSize: 35
                      ),
                    ),
                    SizedBox(height: 20,),
                    CircleAvatar(
                      backgroundImage: NetworkImage(snapshot.data.user.photoUrl),
                      radius: 60,
                    ),
                    SizedBox(height: 80,),
                    FlatButton(
                      onPressed: () {
                        Map<String, dynamic> userData = {
                          'uid': snapshot.data.user.uid,
                          'name': snapshot.data.user.displayName,
                        };
                        save(userData);
                      },
                      child: Text('Register with Firestore',
                          style: TextStyle(
                              color: Colors.white
                          )
                      ),
                      color: Colors.blue,
                    ),
                    SizedBox(height: 20,),
                    SignInButton(
                        Buttons.Facebook,
                        text: 'Sign out from Facebook',
                        onPressed: () => {
                          logoutFacebook(),
                          Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (context) => Login()))
                        }
                    )
                  ],
                ),
              )
          );
        } else {
          widget = Scaffold(
            body: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(
                    child: CircularProgressIndicator(),
                    width: 60,
                    height: 60,
                  ),
                  const Padding(
                    padding: EdgeInsets.only(top: 16),
                    child: Text('Awaiting result...'),
                  )
                ],
              )
            )
          );
        }
        return widget;
      },
    );
  }
}
