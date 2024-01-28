import { Component, OnInit } from '@angular/core';
import { NavigationEnd, ResolveEnd, Router } from '@angular/router';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.scss',
})
export class PageTitleComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
}
