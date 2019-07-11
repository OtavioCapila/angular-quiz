import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Result } from "@zxing/library";
import { ZXingScannerComponent } from "@zxing/ngx-scanner";
import { LoginService } from "./login.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  @ViewChild("scanner") scanner: ZXingScannerComponent;
  constructor(
    private _LOGIN: LoginService,
    private _ROUTER: Router,
    private _TOASTR: ToastrService
  ) {}
  hasCameras = false;
  hasPermission: boolean;
  qrResultString: string;
  availableDevices: MediaDeviceInfo[];
  selectedDevice: MediaDeviceInfo;
  ngOnInit() {
    if (this.verifyIfUserIsLogged()) {
      this._ROUTER.navigate(["/dashboard"]);
    } else {
      if(this.scanner){
        this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
          this.hasCameras = true;
          this.availableDevices = devices;

          this.selectedDevice = this.scanner.getDeviceById(
            this.availableDevices[0].deviceId
          );
          // Selects the devices's back camera by default
          for (const device of devices) {
            if (/back|rear|environment/gi.test(device.label)) {
              this.scanner.changeDevice(device);
              this.selectedDevice = device;
              break;
            }
          }
        });
      }
    }
    if(this.scanner){
      this.scanner.camerasNotFound.subscribe((devices: MediaDeviceInfo[]) => {
        console.error(
          "An error has occurred when trying to enumerate your video-stream-enabled devices."
        );
      });

      this.scanner.permissionResponse.subscribe((answer: boolean) => {
        this.hasPermission = answer;
      });
    }
  }

  handleQrCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.loginUser(resultString.toUpperCase());
  }

  onDeviceSelectChange(selectedValue: string) {
    this.selectedDevice = this.scanner.getDeviceById(selectedValue);
  }

  // translateDeviceName(devices) {
  //   const arr = [];
  //   devices.forEach(element => {
  //     if (/camera  0/gi.test(devices.label)) {
  //       element.label = 'Câmera Traseira';
  //       const device = {
  //         ...element
  //       };
  //       arr.push(device);
  //     } else {
  //       element.label = 'Câmera Frontal';
  //       const device = {
  //         ...element
  //       };
  //       arr.push(device);
  //     }
  //   });
  //   return arr;
  // }

  onClickAccess() {
    this.loginUser(this.qrResultString.toUpperCase());
  }

  verifyIfUserIsLogged() {
    if (
      localStorage.getItem("access_code") &&
      localStorage.getItem("user_id") &&
      localStorage.getItem("user_name")
    ) {
      return true;
    } else return false;
  }

  loginUser(id) {
    this._LOGIN.userLogin(id).subscribe(
      accept => {
        localStorage.setItem("access_code", id);
        localStorage.setItem("user_id", accept.data._id);
        localStorage.setItem("user_name", accept.data.name);
        this._TOASTR.success(`Bem vindo ${accept.data.name}`);
        this.verifyIfUserAlreadySelectedPreference(accept.data);
        this._ROUTER.navigate(["sobre-nos"]);
      },
      reject => {
        this.wrongAnwser();
        this.qrResultString = "";
      }
    );
  }

  verifyIfUserAlreadySelectedPreference(data) {
    if (data.userPreferences[0]) {
      localStorage.setItem("hasPreferences", 'true');
    } else {
      localStorage.setItem("hasPreferences", 'false');
    }
  }

  wrongAnwser() {
    Swal.fire({
      title: "Usuário não cadastrado",
      text: "Não encontramos o seu cadastro em nossa base de dados",
      type: "error",
      confirmButtonText: "Fechar 😞",
    });
  }
}
