import { Injectable } from "@angular/core";
import { ApiService } from "../../core/services/api.service";
import { Post, PostsByUser } from "../../core/models/app.models";

@Injectable({ providedIn: 'root' })
export class DashboardFacade {
  constructor(private api: ApiService) {}

  loadPosts(page: number, pageSize: number, searchTerm: string) {
    return this.api.getPosts(page, pageSize, searchTerm);
  }

  computeStats(posts: Post[]): PostsByUser[] {
    const map = new Map<number, number>();
    for (const post of posts) {
      const id = post.userId ?? 0;
      map.set(id, (map.get(id) ?? 0) + 1);
    }

    return Array.from(map.entries())
      .map(([userId, count]) => ({ userId, count }))
      .sort((a, b) => a.userId - b.userId);
  }
}