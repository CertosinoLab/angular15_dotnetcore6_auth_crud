import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../auth/auth-service';

interface MenuItem {
  title: string;
  icon: string;
  link: string;
  subItems?: MenuItem[];
  expansionIcon?: string;
}

@Component({
  selector: 'app-sidebar-navigation',
  templateUrl: './sidebar-navigation.component.html',
  styleUrls: ['./sidebar-navigation.component.css']
})
export class SidebarNavigationComponent {
  myData: any;

  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const menuItems = document.querySelectorAll('.custom-menu-item');
        menuItems.forEach(item => {
          item.classList.remove('active');
        });

        const currentRoute = event.urlAfterRedirects;
        const activeMenuItem = document.querySelector(`.custom-menu-item[routerLink="${currentRoute}"]`);
        if (activeMenuItem) {
          activeMenuItem.classList.add('active');
        }
      }
    });
  }

  removeFocus() {
    setTimeout(() => {
      const activeMenuItem = document.querySelector('.custom-menu-item.active') as HTMLElement;
      if (activeMenuItem) {
        activeMenuItem.blur();
      }
    }, 10)
  }

  public signout() {
    this.authService.signOut().then(res => {
      this.router.navigate(['/signin'], { replaceUrl: true });
    });
  }
}
