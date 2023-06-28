import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth-guard';
import { AuthInterceptor } from './auth/auth-interceptor';
import { SidebarNavigationComponent } from './components/sidebar-navigation/sidebar-navigation.component';
import { FetchDataComponent } from './old/fetch-data/fetch-data.component';
import { NavMenuComponent } from './old/nav-menu/nav-menu.component';
import { SecuredComponent } from './old/secured/secured.component';
import { ProductsComponent } from './pages/products/products.component';
import { SignInComponent } from './pages/signin/signin.component';
import { SignOutComponent } from './pages/signout/signout.component';
import { UserComponent } from './pages/user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GenericTableComponent } from './components/generic-table/generic-table.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { FormatColumnNamePipe } from './pipes/format-column-name.pipe';
import { FormatColumnDataObjectPipe } from './pipes/format-column-data-object.pipe';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        UserComponent,
        SignInComponent,
        SignOutComponent,
        SecuredComponent,
        FetchDataComponent,
        SidebarNavigationComponent,
        DashboardComponent,
        ProductsComponent,
        GenericTableComponent,
        EmployeesComponent,
        CustomersComponent,
        OrdersComponent,
        FormatColumnNamePipe,
        FormatColumnDataObjectPipe,
        SearchFormComponent
    ],
  imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatMenuModule,
        MatExpansionModule,
        MatDividerModule,
        MatPaginatorModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatDialogModule,
        MatCardModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: 'user',
                pathMatch: 'full'
            },
            {
                path: 'user',
                component: UserComponent,
                pathMatch: 'full'
            },
            {
                path: 'signin',
                component: SignInComponent,
                pathMatch: 'full'
            },
            {
                path: 'signout',
                component: SignOutComponent,
                pathMatch: 'full'
            },
            {
                path: 'secured',
                component: SecuredComponent,
                pathMatch: 'full',
                canActivate: [AuthGuard]
            },
            {
              path: 'fetch-data',
              component: FetchDataComponent,
              pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
                pathMatch: 'full'
            },
            {
                path: 'orders',
                component: OrdersComponent,
                pathMatch: 'full'
            },
            {
                path: 'products',
                component: ProductsComponent,
                pathMatch: 'full'
            },
            {
                path: 'employees',
                component: EmployeesComponent,
                pathMatch: 'full'
            },
            {
                path: 'customers',
                component: CustomersComponent,
                pathMatch: 'full'
          },
          {
            path: '**',
            redirectTo: '/user' // Redirect verso la pagina "non trovata" per tutte le altre rotte
          }
        ])
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useFactory: function (router: Router) {
                return new AuthInterceptor(router);
            },
            multi: true,
            deps: [Router]
        },
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
