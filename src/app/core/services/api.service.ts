import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Post {
  id?: number;
  userId?: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  // READ con soporte de paginación básica
  getPosts(page = 1, limit = 10, searchTerm?: string): Observable<Post[]> {
    let params = new HttpParams()
      .set('_page', page)
      .set('_limit', limit);

    if (searchTerm) {
      params = params.set('q', searchTerm);
    }

    return this.http.get<Post[]>(`${this.baseUrl}/posts`, { params });
  }

  // READ one
  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`);
  }

  // CREATE
  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/posts`, post);
  }

  // UPDATE
  updatePost(id: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/posts/${id}`, post);
  }

  // DELETE
  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/posts/${id}`);
  }
}
