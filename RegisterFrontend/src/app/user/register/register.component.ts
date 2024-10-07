import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {User} from "../user";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SpinnerOverlayComponent} from "../../spinner-overlay/spinner-overlay.component";
import {finalize} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent {

  constructor(private userService: UserService, private snackBar: MatSnackBar
    , private dialog: MatDialog, private router: Router) {
  }

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.minLength(5), Validators.maxLength(30), Validators.pattern(/^[a-zA-Z0-9]*$/)]),
    password: new FormControl('')
  });

  register() {
    const dialogRef: MatDialogRef<SpinnerOverlayComponent> = this.dialog.open(SpinnerOverlayComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
    this.userService.registerUser(this.registerForm.value as User).pipe(finalize(() => {
      dialogRef.close();
    })).subscribe({
      next: () => {
        this.router.navigateByUrl('register/success');
      },
      error: (e: Error) => {
        this.snackBar.open(e.message, undefined, {duration: 3000});
      }
    });
  }
}
