import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, User, Todo } from '../models/app.models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  // ===== POSTS (para Dashboard) =====
  getPosts(page = 1, limit = 10, searchTerm?: string): Observable<Post[]> {
    let params = new HttpParams()
      .set('_page', page)
      .set('_limit', limit);

    if (searchTerm) {
      params = params.set('q', searchTerm);
    }

    return this.http.get<Post[]>(`${this.baseUrl}/posts`, { params });
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/posts`, post);
  }

  updatePost(id: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/posts/${id}`, post);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/posts/${id}`);
  }

  // ===== USERS (para Perfil / validación asíncrona) =====

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

  getUsers(params?: Record<string, string>): Observable<User[]> {
    let httpParams = new HttpParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        httpParams = httpParams.set(key, value);
      });
    }

    return this.http.get<User[]>(`${this.baseUrl}/users`, { params: httpParams });
  }

  // ===== TODOS (para Activity / histórico) =====
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.baseUrl}/todos`);
  }
}
