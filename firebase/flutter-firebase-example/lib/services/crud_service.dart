import 'dart:io';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:image_picker/image_picker.dart';

Future<void> save(userData) async {
  // se escoge la imagen de la galeria
  final _picker = ImagePicker();
  var image = await _picker.getImage(source: ImageSource.gallery);
  var file = File(image.path);

  // guardamos la imagen en firebase storage y obtenemos la url
  var snapshot = await FirebaseStorage.instance.ref()
      .child(userData['uid'])
      .putFile(file)
      .onComplete;
  var downloadUrl = await snapshot.ref.getDownloadURL();

  // agregamos la url de la imagen en el userData y guardamos en Firestore
  userData['photoUrl'] = downloadUrl;
  Firestore.instance.collection('users').document(userData['uid']).setData(userData);
}