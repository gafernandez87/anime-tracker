import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AnimeService } from '../../services/anime.service';
import { Anime } from '../../interfaces/anime.interface';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-anime-detail',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ModalComponent],
  templateUrl: './anime-detail.component.html',
  styleUrls: ['./anime-detail.component.scss']
})
export class AnimeDetailComponent implements OnInit, AfterViewInit {
  anime: Anime | null = null;
  loading = true;
  error = '';
  showCoverModal = false;

  constructor(
    private route: ActivatedRoute,
    private animeService: AnimeService,
    private location: Location
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadAnime(id);
    }
  }

  ngAfterViewInit(): void {
    // scroll top
    window.scrollTo(0, 0);
  }

  private loadAnime(id: string) {
    this.loading = true;
    this.error = '';

    this.animeService.getAnimeById(id).subscribe({
      next: (anime) => {
        this.anime = anime;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message || 'anime.detail.error';
        this.loading = false;
      }
    });
  }

  goBack() {
    this.location.back();
  }

  parseFloat(value: string): number {
    return Number.parseFloat(value);
  }
} 