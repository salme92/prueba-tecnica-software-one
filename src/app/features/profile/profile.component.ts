import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { debounceTime, map, of, switchMap, catchError } from 'rxjs';

import { ApiService } from '../../core/services/api.service';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit, AfterViewInit {
  form!: FormGroup;
  saving = false;
  saved = false;

  // el template usa #nameInput para el ViewChild
  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: [
        '',
        [Validators.required, Validators.email],
        [this.emailExistsValidator()],
      ],
      username: ['', [Validators.required, this.noSpacesValidator]],
      // campos extra que aparecen en el nuevo HTML (opcionales)
      phone: [''],
      website: [''],
      bio: [''],
    });
  }

  ngAfterViewInit(): void {
    // Ejemplo de uso de ViewChild
    if (this.nameInput?.nativeElement) {
      this.nameInput.nativeElement.focus();
    }
  }

  /** Getter para usar `loading` en el template (mapea a saving) */
  get loading(): boolean {
    return this.saving;
  }

  /** Custom validator - no permitir espacios en username */
  noSpacesValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (value && value.includes(' ')) {
      return { spacesNotAllowed: true };
    }
    return null;
  }

  /** Async validator para comprobar si el email ya existe */
  emailExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return of(control.value).pipe(
        debounceTime(500),
        switchMap((email) => {
          if (!email) return of(null);
          return this.api.getUsers({ email }).pipe(
            map((users) => (users.length > 0 ? { emailTaken: true } : null)),
            catchError(() => of(null))
          );
        })
      );
    };
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.saved = false;
    this.cdr.markForCheck();

    // Simulación de guardado
    setTimeout(() => {
      this.saving = false;
      this.saved = true;
      this.cdr.markForCheck();
    }, 1200);
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (!control || !control.errors) return '';

    if (control.hasError('required')) return 'Campo obligatorio';
    if (control.hasError('minlength'))
      return 'Debe tener al menos 3 caracteres';
    if (control.hasError('email')) return 'Formato de email no válido';
    if (control.hasError('emailTaken')) return 'El email ya existe';
    if (control.hasError('spacesNotAllowed'))
      return 'No se permiten espacios';
    return 'Error desconocido';
  }
}
