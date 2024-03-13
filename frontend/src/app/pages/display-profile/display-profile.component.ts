import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../user.interface';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-display-profile',
  standalone: true,
  imports: [CommonModule ,NavbarComponent],
  templateUrl: './display-profile.component.html',
  styleUrl: './display-profile.component.css',
})
export class DisplayProfileComponent implements OnInit {
  public users$: Observable<User[]> | undefined;
  constructor(private api: ApiService) {}
  ngOnInit(): void {
    this.users$ = this.api.getUsers();
  }
}
