import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { debounceTime, map, of, switchMap } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

/** Validador síncrono: algunos nombres no permitidos */
function forbiddenNameValidator(
  control: AbstractControl
): ValidationErrors | null {
  const forbidden = ['admin', 'root', 'superuser'];
  const value = (control.value ?? '').toString().toLowerCase();

  return forbidden.includes(value) ? { forbiddenName: true } : null;
}

/** Validador asíncrono: simulamos comprobar si el username ya existe */
function usernameExistsValidator(api: ApiService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value?.toString().trim();

    if (!value) {
      return of(null);
    }

    return of(value).pipe(
      debounceTime(400),
      switchMap((username) =>
        api.getUsers({ username }).pipe(
          map((users) =>
            users && users.length > 0 ? { usernameTaken: true } : null
          )
        )
      )
    );
  };
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  form: FormGroup;

  // Ejemplo de ViewChild: enfocamos el campo nombre desde un botón
  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.form = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.minLength(3), forbiddenNameValidator],
      ],
      email: ['', [Validators.required, Validators.email]],
      username: [
        '',
        [Validators.required, Validators.minLength(3)],
        [usernameExistsValidator(this.api)],
      ],
    });
  }

  focusName(): void {
    if (this.nameInput?.nativeElement) {
      this.nameInput.nativeElement.focus();
    }
  }

  getErrorMessage(controlName: string): string | null {
    const ctrl = this.form.get(controlName);
    if (!ctrl || !ctrl.touched && !ctrl.dirty) {
      return null;
    }

    if (ctrl.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (ctrl.hasError('minlength')) {
      const requiredLength = ctrl.getError('minlength')?.requiredLength;
      return `Debe tener al menos ${requiredLength} caracteres`;
    }
    if (ctrl.hasError('email')) {
      return 'Debe ser un email válido';
    }
    if (ctrl.hasError('forbiddenName')) {
      return 'Este nombre no está permitido';
    }
    if (ctrl.hasError('usernameTaken')) {
      return 'Este nombre de usuario ya está en uso';
    }

    return null;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Aquí podrías llamar a ApiService.createUser/updateUser
    console.log('Perfil guardado:', this.form.value);
    alert('Perfil guardado correctamente (simulado)');
  }
}
