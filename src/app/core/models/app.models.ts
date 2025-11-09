// src/app/core/models/app.models.ts

/**
 * Representa un post obtenido de JSONPlaceholder
 */
export interface Post {
  userId?: number;
  id?: number;
  title: string;
  body: string;
}

/**
 * Representa un usuario obtenido de JSONPlaceholder
 */
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone?: string;
  website?: string;
}

/**
 * Representa una tarea (todo) de JSONPlaceholder
 */
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

/**
 * Modelo simplificado para mostrar posts agrupados por usuario
 */
export interface PostsByUser {
  userId: number;
  count: number;
}

/**
 * Configuración de preferencias del usuario (tema, idioma, notificaciones)
 */
export interface UserPreferences {
  theme: 'light' | 'dark';
  language: 'es' | 'en';
  notificationsEnabled: boolean;
}

/**
 * Configuración persistida localmente en LocalStorage
 */
export interface LocalStorageState {
  favorites?: number[];
  lastLogin?: string;
  token?: string;
}

/**
 * Modelo de error controlado por el ErrorHandler global
 */
export interface AppError {
  message: string;
  code?: number;
  stack?: string;
  context?: string;
}

/**
 * LogEntry: registro de eventos para LoggerService
 */
export interface LogEntry {
  level: 'info' | 'warn' | 'error';
  message: string;
  timestamp: Date;
  context?: string;
}

/**
 * Clase para agrupar constantes globales de configuración
 */
export class AppConfig {
  static readonly API_BASE_URL = 'https://jsonplaceholder.typicode.com';
  static readonly ITEMS_PER_PAGE = 10;
  static readonly STORAGE_KEYS = {
    THEME: 'app_theme',
    LANGUAGE: 'app_language',
    FAVORITES: 'app_favorites',
  };
}
