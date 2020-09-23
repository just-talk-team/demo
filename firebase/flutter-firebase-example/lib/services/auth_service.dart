import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_facebook_auth/flutter_facebook_auth.dart';

final _facebook = FacebookAuth.instance;
final _firebase = FirebaseAuth.instance;

Future<UserCredential> loginFacebook() async {
  // Trigger the sign-in flow
  final LoginResult result = await _facebook.login();

  // Create a credential from the access token
  final FacebookAuthCredential facebookAuthCredential = FacebookAuthProvider.credential(result.accessToken.token);

  UserCredential userCredential = await _firebase.signInWithCredential(facebookAuthCredential);

  // Once signed in, return the UserCredential
  return userCredential;
}

// documentación de flutterfire

Future<void> logoutFacebook() async {
  await _firebase.signOut();
  await _facebook.logOut();
}