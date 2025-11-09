import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { Post, Todo, User } from '../models/app.models';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const baseUrl = 'https://jsonplaceholder.typicode.com';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('debería obtener posts con getPosts', () => {
    const dummyPosts: Post[] = [
      { id: 1, userId: 1, title: 'Test', body: 'Body' },
    ];

    service.getPosts(1, 10).subscribe((posts) => {
      expect(posts.length).toBe(1);
      expect(posts[0].title).toBe('Test');
    });

    const req = httpMock.expectOne(
      `${baseUrl}/posts?_page=1&_limit=10`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyPosts);
  });

  it('debería obtener un usuario con getUser', () => {
    const dummyUser: any = {
      id: 1,
      name: 'User',
      email: 'user@test.com',
    };

    service.getUser(1).subscribe((user) => {
      expect(user.id).toBe(1);
      expect(user.name).toBe('User');
    });

    const req = httpMock.expectOne(`${baseUrl}/users/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUser);
  });

  it('debería obtener todos con getTodos', () => {
    const dummyTodos: Todo[] = [
      { id: 1, userId: 1, title: 'Todo 1', completed: false },
    ];

    service.getTodos().subscribe((todos) => {
      expect(todos.length).toBe(1);
      expect(todos[0].title).toBe('Todo 1');
    });

    const req = httpMock.expectOne(`${baseUrl}/todos`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTodos);
  });
});
