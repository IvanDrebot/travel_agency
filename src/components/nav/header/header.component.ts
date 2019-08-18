import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/services/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {}

  toggle() {
    this.sidebarService.isClosed = !this.sidebarService.isClosed;
  }
}
