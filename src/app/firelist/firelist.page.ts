import { Component, OnInit } from "@angular/core";
import { HTTP } from "@ionic-native/http/ngx";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../../environments/environment";
import { AngularFireStorage } from "@angular/fire/storage";

@Component({
  selector: "app-firelist",
  templateUrl: "./firelist.page.html",
  styleUrls: ["./firelist.page.scss"]
})
export class FirelistPage implements OnInit {
  constructor(private nativeHttp: HTTP, private storage: AngularFireStorage) {}

  ngOnInit() {}
 

  
  getDataNative() {// Create a reference under which you want to list
    var storage = storage.storage();
    var storageRef = storage.ref();

    var listRef = storageRef.child('images');

    // Find all the prefixes and items.
    listRef.listAll().then(function (res) {
      res.prefixes.forEach(function (folderRef) {
        // All the prefixes under listRef.
        // You may call listAll() recursively on them.
      });
      res.items.forEach(function (itemRef) {
        // All the items under listRef.
      });
    }).catch(function (error) {
      // Uh-oh, an error occurred!
    });
  }
}
