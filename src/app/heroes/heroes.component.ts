import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hero } from '../hero';
import { FormsModule } from '@angular/forms';
import { HeroService } from '../hero.service';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule, FormsModule, HeroDetailComponent],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css',
})
export class HeroesComponent {
  // this is other way to inject dependency
  //private heroService = inject(HeroService)
  heroes: Hero[] = [];
  selectedHero?: Hero;
  messageService = inject(MessageService);

  constructor(private heroService: HeroService) {

  }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes() {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes)
    //this.heroes = this.heroService.getHeroes();
  }

  buttonClicked(hero: Hero) {
    this.messageService.add(`${hero.name} clicked`);
    if (this.selectedHero === hero)
      this.selectedHero = undefined;
    else
      this.selectedHero = hero;
  }
}
