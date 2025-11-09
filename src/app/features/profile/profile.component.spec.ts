import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProfileComponent } from './profile.component';
import { ApiService } from '../../core/services/api.service';

class ApiServiceMock {
  getUsers() {
    // Simulamos que no hay usuarios con ese email
    return of([]);
  }
}

describe('ProfileComponent', () => {
  let component: ProfileComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent],
      providers: [{ provide: ApiService, useClass: ApiServiceMock }],
    }).compileComponents();

    const fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('el formulario debería ser inválido inicialmente', () => {
    expect(component.form.valid).toBeFalse();
  });

  it('debería ser válido con datos correctos', fakeAsync(() => {
    component.form.patchValue({
      name: 'Alberto',
      email: 'test@test.com',
      username: 'alberto123',
    });

    tick(600); // tiempo para el async validator del email
    expect(component.form.valid).toBeTrue();
  }));

  it('submit debería marcar saved=true cuando el formulario es válido', fakeAsync(() => {
    component.form.patchValue({
      name: 'Alberto',
      email: 'test@test.com',
      username: 'alberto123',
    });

    tick(600); // esperar validador async
    component.submit();
    tick(1500); // esperar el setTimeout interno

    expect(component.saved).toBeTrue();
  }));
});
