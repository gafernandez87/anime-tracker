import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Language = 'en' | 'es' | 'ja';

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
      'home': 'Home',
      'loading': 'Loading...',
      'anime': 'Anime',
      'cancel': 'Cancel',
      'save': 'Save',
      'edit': 'Edit',

      // Header
      'app.title': 'Anime Tracker',
      'header.login': 'Login',
      'header.logout': 'Logout',
      'header.favorites': 'Watched Animes',
      'header.profile': 'My Profile',
      'header.together': 'Together',
      
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
      'home.filter.status': 'Status',
      'home.filter.status.all': 'All',
      'home.filter.status.current': 'Currently Airing',
      'home.filter.status.finished': 'Finished',
      'home.filter.status.upcoming': 'Upcoming',
      'home.filter.status.unreleased': 'Unreleased',
      'home.filter.status.tba': 'TBA',
      'home.filter.age': 'Age Rating',
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
      'detail.rating': 'Rating',
      'detail.episodes': 'Episodes',
      'detail.status': 'Status',
      'detail.aired': 'Aired',
      'detail.to': 'to',
      'detail.synopsis': 'Synopsis',
      'detail.error': 'Error loading anime details. Please try again later.',

      // Anime card
      'add.watched': 'Mark as watched',
      'remove.watched': 'Remove from watched',

      // Watched Component
      'watched.public.list': 'Make list public',

      // Profile
      'profile.avatar.title': 'Change Avatar',
      'profile.avatar.select': 'Select an avatar',
      'profile.bio': 'About me',
      'profile.no.bio': 'No bio',
      'profile.change.password': 'Change Password',
      'profile.password.current': 'Current Password',
      'profile.password.current.placeholder': 'Enter your current password',
      'profile.password.new': 'New Password',
      'profile.password.new.placeholder': 'Enter your new password',
      'profile.password.confirm': 'Confirm Password',
      'profile.password.confirm.placeholder': 'Confirm your new password',
      'profile.password.change': 'Change Password',
      'profile.edit': 'Edit Profile',
      'profile.watched.title': 'Watched Animes',
    },
    es: {
      'home': 'Inicio',
      'loading': 'Cargando...',
      'anime': 'Anime',
      'cancel': 'Cancelar',
      'save': 'Guardar',
      'edit': 'Editar',

      // Header
      'app.title': 'Anime Tracker',
      'header.login': 'Iniciar Sesión',
      'header.logout': 'Cerrar Sesión',
      'header.favorites': 'Animes Vistos',
      'header.profile': 'Mi Perfil',
      'header.together': 'Juntos',
      
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
      'home.filter.status': 'Estado',
      'home.filter.status.all': 'Todos',
      'home.filter.status.current': 'En Emisión',
      'home.filter.status.finished': 'Finalizado',
      'home.filter.status.upcoming': 'Próximamente',
      'home.filter.status.unreleased': 'No Publicado',
      'home.filter.status.tba': 'Por Anunciar',
      'home.filter.age': 'Clasificación por Edad',
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
      'detail.rating': 'Calificación',
      'detail.episodes': 'Episodios',
      'detail.status': 'Estado',
      'detail.aired': 'Emitido',
      'detail.to': 'hasta',
      'detail.synopsis': 'Sinopsis',
      'detail.error': 'Error al cargar los detalles del anime. Por favor intente más tarde.',

      // Anime card
      'add.watched': 'Marcar como visto',
      'remove.watched': 'Eliminar de vistos',

      // Watched Component
      'watched.public.list': 'Hacer lista pública',

      // Profile
      'profile.avatar.title': 'Cambiar Avatar',
      'profile.avatar.select': 'Seleccionar un avatar',
      'profile.bio': 'Sobre mí',
      'profile.no.bio': 'Sin bio',
      'profile.change.password': 'Cambiar Contraseña',
      'profile.password.current': 'Contraseña Actual',
      'profile.password.current.placeholder': 'Ingresa tu contraseña actual',
      'profile.password.new': 'Nueva Contraseña',
      'profile.password.new.placeholder': 'Ingresa tu nueva contraseña',
      'profile.password.confirm': 'Confirmar Contraseña',
      'profile.password.confirm.placeholder': 'Confirma tu nueva contraseña',
      'profile.password.change': 'Cambiar Contraseña',
      'profile.edit': 'Editar Perfil',
      'profile.watched.title': 'Animes Vistos',
    },
    ja: {
      // General
      'home': 'ホーム',
      'loading': '読み込み中...',
      'anime': 'アニメ',
      'cancel': 'キャンセル',
      'save': '保存',
      'edit': '編集',

      // Header
      'app.title': 'アニメトラッカー',
      'header.login': 'ログイン',
      'header.logout': 'ログアウト',
      'header.favorites': '視聴済みアニメ',
      'header.profile': 'マイプロフィール',
      'header.together': '一緒に',

      // Login
      'login.title': 'ログイン',
      'login.email': 'メールアドレス',
      'login.email.placeholder': 'メールアドレスを入力',
      'login.password': 'パスワード',
      'login.password.placeholder': 'パスワードを入力',
      'login.submit': 'ログイン',
      'login.error.email.required': 'メールアドレスは必須です',
      'login.error.email.invalid': '有効なメールアドレスを入力してください',
      'login.error.password.required': 'パスワードは必須です',
      'login.error.password.minlength': 'パスワードは6文字以上である必要があります',
      'login.error.invalid': 'メールアドレスまたはパスワードが無効です',
      'login.no.account': 'アカウントをお持ちでないですか？',
      'login.signup.link': '登録する',

      // Signup
      'signup.title': 'アカウント作成',
      'signup.username': 'ユーザー名',
      'signup.username.placeholder': 'ユーザー名を入力',
      'signup.email': 'メールアドレス',
      'signup.email.placeholder': 'メールアドレスを入力',
      'signup.password': 'パスワード',
      'signup.password.placeholder': 'パスワードを作成',
      'signup.submit': '登録する',
      'signup.loading': 'アカウントを作成中...',
      'signup.error.username.required': 'ユーザー名は必須です',
      'signup.error.username.minlength': 'ユーザー名は3文字以上である必要があります',
      'signup.error.email.required': 'メールアドレスは必須です',
      'signup.error.email.invalid': '有効なメールアドレスを入力してください',
      'signup.error.password.required': 'パスワードは必須です',
      'signup.error.password.minlength': 'パスワードは6文字以上である必要があります',
      'signup.error.generic': 'アカウント作成中にエラーが発生しました。もう一度お試しください。',
      'signup.have.account': 'すでにアカウントをお持ちですか？',
      'signup.login.link': 'ログイン',
      'signup.password.show': 'パスワードを表示',
      'signup.password.hide': 'パスワードを非表示',

      // Home
      'home.search.label': '検索',
      'home.search.placeholder': 'アニメの名前を入力...',
      'home.search.button': '検索',
      'home.filter.status': 'ステータス',
      'home.filter.status.all': 'すべて',
      'home.filter.status.current': '放送中',
      'home.filter.status.finished': '完結',
      'home.filter.status.upcoming': '近日公開',
      'home.filter.status.unreleased': '未公開',
      'home.filter.status.tba': '未定',
      'home.filter.age': '年齢制限',
      'home.filter.age.all': 'すべて',
      'home.filter.age.g': 'G - 全年齢対象',
      'home.filter.age.pg': 'PG - 子供向け',
      'home.filter.age.r': 'R - 17歳以上（暴力・言葉）',
      'home.filter.age.r18': 'R18 - 成人向け',
      'home.episodes': '話',
      'home.load.more': 'もっと読み込む',
      'home.no.more': 'これ以上結果はありません',
      'home.error': 'アニメの読み込み中にエラーが発生しました。もう一度お試しください。',
      'home.retry': '再試行',
      'home.view.details': '詳細を見る',

      // Anime Detail
      'detail.back': 'リストに戻る',
      'detail.rating': '評価',
      'detail.episodes': '話数',
      'detail.status': 'ステータス',
      'detail.aired': '放送期間',
      'detail.to': 'から',
      'detail.synopsis': 'あらすじ',
      'detail.error': 'アニメの詳細を読み込めませんでした。後ほどお試しください。',

      // Anime card
      'add.watched': '視聴済みに追加',
      'remove.watched': '視聴済みから削除',

      // Watched Component
      'watched.public.list': 'リストを公開する',

      // Profile
      'profile.avatar.title': 'アバターを変更',
      'profile.avatar.select': 'アバターを選択',
      'profile.bio': '自己紹介',
      'profile.no.bio': '自己紹介がありません',
      'profile.change.password': 'パスワードを変更',
      'profile.password.current': '現在のパスワード',
      'profile.password.current.placeholder': '現在のパスワードを入力',
      'profile.password.new': '新しいパスワード',
      'profile.password.new.placeholder': '新しいパスワードを入力',
      'profile.password.confirm': 'パスワードを確認',
      'profile.password.confirm.placeholder': '新しいパスワードを確認',
      'profile.password.change': 'パスワードを変更',
      'profile.edit': 'プロフィールを編集',
      'profile.watched.title': '視聴済みアニメ',
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