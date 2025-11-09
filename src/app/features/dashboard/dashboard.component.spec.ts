import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DashboardComponent } from './dashboard.component';
import { ApiService, Post } from '../../core/services/api.service';

class ApiServiceMock {
  getPosts() {
    const posts: Post[] = [
      { id: 1, userId: 1, title: 'Post 1', body: 'Body 1' },
      { id: 2, userId: 1, title: 'Post 2', body: 'Body 2' },
      { id: 3, userId: 2, title: 'Post 3', body: 'Body 3' },
    ];
    return of(posts);
  }

  createPost(post: Post) {
    return of({ ...post, id: 999 });
  }

  updatePost(id: number, post: Post) {
    return of({ ...post, id });
  }

  deletePost(id: number) {
    return of(void 0);
  }

  getUser() {
    return of({ id: 1, name: 'User', email: 'user@test.com' });
  }
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [{ provide: ApiService, useClass: ApiServiceMock }],
    }).compileComponents();

    const fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar posts en la inicialización', () => {
    expect(component.posts.length).toBe(3);
  });

  it('debería calcular estadísticas para el gráfico', () => {
    expect(component.postsByUser.length).toBeGreaterThan(0);
    const user1Stats = component.postsByUser.find((x) => x.userId === 1);
    expect(user1Stats?.count).toBe(2);
  });

  it('debería crear un nuevo post', () => {
    component.newPost();
    component.editablePost = { title: 'Nuevo', body: 'Contenido' };
    component.savePost();

    expect(component.posts.some((p) => p.title === 'Nuevo')).toBeTrue();
  });
});
