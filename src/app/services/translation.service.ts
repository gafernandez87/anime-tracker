import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Language = 'en' | 'es';

type Translations = {
  [key: string]: string;
};

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLang = new BehaviorSubject<Language>('es');
  currentLang$ = this.currentLang.asObservable();

  private translations: { [key in Language]: Translations } = {
    en: {
      // General
      'loading': 'Loading...',

      // Header
      'app.title': 'Anime Tracker',
      'header.login': 'Login',
      'header.logout': 'Logout',
      'header.favorites': 'Watched Animes',
      'header.profile': 'Profile',
      
      // Login
      'login.title': 'Login',
      'login.email': 'Email',
      'login.email.placeholder': 'Enter your email',
      'login.password': 'Password',
      'login.password.placeholder': 'Enter your password',
      'login.submit': 'Login',
      'login.error.email.required': 'Email is required',
      'login.error.email.invalid': 'Please enter a valid email',
      'login.error.password.required': 'Password is required',
      'login.error.password.minlength': 'Password must be at least 6 characters',
      'login.error.invalid': 'Invalid email or password',
      'login.no.account': 'Don\'t have an account?',
      'login.signup.link': 'Sign up',

      // Signup
      'signup.title': 'Create Account',
      'signup.username': 'Username',
      'signup.username.placeholder': 'Choose a username',
      'signup.email': 'Email',
      'signup.email.placeholder': 'Enter your email',
      'signup.password': 'Password',
      'signup.password.placeholder': 'Create a password',
      'signup.submit': 'Sign Up',
      'signup.loading': 'Creating account...',
      'signup.error.username.required': 'Username is required',
      'signup.error.username.minlength': 'Username must be at least 3 characters',
      'signup.error.email.required': 'Email is required',
      'signup.error.email.invalid': 'Please enter a valid email',
      'signup.error.password.required': 'Password is required',
      'signup.error.password.minlength': 'Password must be at least 6 characters',
      'signup.error.generic': 'Error creating account. Please try again.',
      'signup.have.account': 'Already have an account?',
      'signup.login.link': 'Log in',
      'signup.password.show': 'Show password',
      'signup.password.hide': 'Hide password',
      
      // Home
      'home.search.label': 'Search',
      'home.search.placeholder': 'Type the name of an anime...',
      'home.search.button': 'Search',
      'home.filter.status': 'Status:',
      'home.filter.status.all': 'All',
      'home.filter.status.current': 'Currently Airing',
      'home.filter.status.finished': 'Finished',
      'home.filter.status.upcoming': 'Upcoming',
      'home.filter.status.unreleased': 'Unreleased',
      'home.filter.status.tba': 'TBA',
      'home.filter.age': 'Age Rating:',
      'home.filter.age.all': 'All',
      'home.filter.age.g': 'G - All Ages',
      'home.filter.age.pg': 'PG - Children',
      'home.filter.age.r': 'R - 17+ (violence & profanity)',
      'home.filter.age.r18': 'R18 - Adults Only',
      'home.episodes': 'episodes',
      'home.load.more': 'Load More',
      'home.no.more': 'No More Results',
      'home.error': 'Error loading animes. Please try again.',
      'home.retry': 'Try Again',
      'home.view.details': 'View Details',

      // Anime Detail
      'detail.back': 'Back to List',
      'detail.rating': 'Rating:',
      'detail.episodes': 'Episodes:',
      'detail.status': 'Status:',
      'detail.aired': 'Aired:',
      'detail.to': 'to',
      'detail.synopsis': 'Synopsis',
      'detail.error': 'Error loading anime details. Please try again later.',

      // Anime card
      'add.wathced': 'Mark as watched',
      'remove.watched': 'Remove from watched',
    },
    es: {
      'loading': 'Cargando...',

      // Header
      'app.title': 'Anime Tracker',
      'header.login': 'Iniciar Sesión',
      'header.logout': 'Cerrar Sesión',
      'header.favorites': 'Animes Vistos',
      'header.profile': 'Perfil',
      
      // Login
      'login.title': 'Iniciar Sesión',
      'login.email': 'Correo Electrónico',
      'login.email.placeholder': 'Ingresa tu correo electrónico',
      'login.password': 'Contraseña',
      'login.password.placeholder': 'Ingresa tu contraseña',
      'login.submit': 'Iniciar Sesión',
      'login.error.email.required': 'El correo electrónico es requerido',
      'login.error.email.invalid': 'Por favor ingresa un correo electrónico válido',
      'login.error.password.required': 'La contraseña es requerida',
      'login.error.password.minlength': 'La contraseña debe tener al menos 6 caracteres',
      'login.error.invalid': 'Correo electrónico o contraseña inválidos',
      'login.no.account': '¿No tienes una cuenta?',
      'login.signup.link': 'Regístrate',

      // Signup
      'signup.title': 'Crear Cuenta',
      'signup.username': 'Nombre de Usuario',
      'signup.username.placeholder': 'Elige un nombre de usuario',
      'signup.email': 'Correo Electrónico',
      'signup.email.placeholder': 'Ingresa tu correo electrónico',
      'signup.password': 'Contraseña',
      'signup.password.placeholder': 'Crea una contraseña',
      'signup.submit': 'Registrarse',
      'signup.loading': 'Creando cuenta...',
      'signup.error.username.required': 'El nombre de usuario es requerido',
      'signup.error.username.minlength': 'El nombre de usuario debe tener al menos 3 caracteres',
      'signup.error.email.required': 'El correo electrónico es requerido',
      'signup.error.email.invalid': 'Por favor ingresa un correo electrónico válido',
      'signup.error.password.required': 'La contraseña es requerida',
      'signup.error.password.minlength': 'La contraseña debe tener al menos 6 caracteres',
      'signup.error.generic': 'Error al crear la cuenta. Por favor intenta de nuevo.',
      'signup.have.account': '¿Ya tienes una cuenta?',
      'signup.login.link': 'Inicia sesión',
      'signup.password.show': 'Mostrar contraseña',
      'signup.password.hide': 'Ocultar contraseña',
      
      // Home
      'home.search.label': 'Buscar',
      'home.search.placeholder': 'Escribe el nombre de un anime...',
      'home.search.button': 'Buscar',
      'home.filter.status': 'Estado:',
      'home.filter.status.all': 'Todos',
      'home.filter.status.current': 'En Emisión',
      'home.filter.status.finished': 'Finalizado',
      'home.filter.status.upcoming': 'Próximamente',
      'home.filter.status.unreleased': 'No Publicado',
      'home.filter.status.tba': 'Por Anunciar',
      'home.filter.age': 'Clasificación por Edad:',
      'home.filter.age.all': 'Todas',
      'home.filter.age.g': 'G - Todas las Edades',
      'home.filter.age.pg': 'PG - Niños',
      'home.filter.age.r': 'R - +17 (violencia y lenguaje)',
      'home.filter.age.r18': 'R18 - Solo Adultos',
      'home.episodes': 'episodios',
      'home.load.more': 'Cargar Más',
      'home.no.more': 'No Hay Más Resultados',
      'home.error': 'Error al cargar animes. Por favor intenta de nuevo.',
      'home.retry': 'Intentar de Nuevo',
      'home.view.details': 'Ver Detalles',

      // Anime Detail
      'detail.back': 'Volver a la Lista',
      'detail.rating': 'Calificación:',
      'detail.episodes': 'Episodios:',
      'detail.status': 'Estado:',
      'detail.aired': 'Emitido:',
      'detail.to': 'hasta',
      'detail.synopsis': 'Sinopsis',
      'detail.error': 'Error al cargar los detalles del anime. Por favor intente más tarde.',

      // Anime card
      'add.watched': 'Marcar como visto',
      'remove.watched': 'Eliminar de vistos',
    }
  };

  constructor() {
    // Intentar cargar el idioma guardado
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && (savedLang === 'en' || savedLang === 'es')) {
      this.currentLang.next(savedLang);
    } else {
      // Si no hay idioma guardado, usar español por defecto
      localStorage.setItem('preferred-language', 'es');
    }
  }

  setLanguage(lang: Language) {
    localStorage.setItem('preferred-language', lang);
    this.currentLang.next(lang);
  }

  translate(key: string): string {
    const translations = this.translations[this.currentLang.value];
    return translations[key] || key;
  }
} 