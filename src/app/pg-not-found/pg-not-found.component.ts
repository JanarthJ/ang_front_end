import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pg-not-found',
  templateUrl: './pg-not-found.component.html',
  styleUrls: ['./pg-not-found.component.css']
})
export class PgNotFoundComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    let self = this;
    setTimeout(function () {
      self.router.navigateByUrl('/login');
    }, 3000)
  }
}
