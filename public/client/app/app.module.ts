/// <reference path="../vendor.d.ts"/>

import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpModule, JsonpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { routing,
         appRoutingProviders } from './app.routes';

import {BaseComponent} from './components/baseComponent/baseComponent';
import {RouletteComponent} from './components/rouletteComponent/rouletteComponent';

import {DashboardComponent} from './admin/components/baseComponent/baseComponent';
import {AccountSettingsComponent} from './admin/components/accountSettingsComponent/accountSettingsComponent';
import {BlogCtrlCenterComponent} from './admin/components/blogCtrlCenterComponent/blogCtrlCenterComponent';
import {ProfileCtrlCenterComponent} from './admin/components/profileCtrlCenterComponent/profileCtrlCenterComponent';
import {ProjectsCtrlCenterComponent} from './admin/components/projectsCtrlCenterComponent/projectsCtrlCenterComponent';
import {VersionsCtrlCenterComponent} from './admin/components/versionsCtrlCenterComponent/versionsCtrlCenterComponent';

// Import Projects Components
import {ProjectComponent} from './projects/components/baseComponent/baseComponent';
import {DownloadWishlistEbooksComponent} from './projects/download-wishlist-ebooks/components/baseComponent/baseComponent';

// Import Versions Components
import {VersionComponent} from './versions/components/baseComponent/baseComponent';
import {VersionCubicComponent} from './versions/version-cubic/components/baseComponent/baseComponent';
import {VersionMaterialComponent} from './versions/version-material/components/baseComponent/baseComponent';
import {VersionTypographyComponent} from './versions/version-typography/components/baseComponent/baseComponent';

// Import Services
import {VersionsService} from './services/VersionsService';
import {MessageService} from './services/MessageService';
import {AccountService} from './services/AccountService';
import {ProjectsService} from './services/ProjectsService';
import {ProfileService} from './services/ProfileService';
import {BlogPostsService} from './services/BlogPostsService';
import {TagSuggestService} from './services/TagSuggestService';
import {UtilsService} from './services/UtilsService';
import {S3Service} from './services/S3Service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpModule,
    JsonpModule,
    routing
  ],
  declarations: [
    AppComponent,
    BaseComponent,
    RouletteComponent,

    // Admin components
    DashboardComponent,
    AccountSettingsComponent,
    BlogCtrlCenterComponent,
    ProfileCtrlCenterComponent,
    ProjectsCtrlCenterComponent,
    VersionsCtrlCenterComponent,

    // Project components
    ProjectComponent,
    DownloadWishlistEbooksComponent,

    // Version components
    VersionComponent,
    VersionCubicComponent,
    VersionMaterialComponent,
    VersionTypographyComponent
  ],
  providers: [ // Services injected here are singletons available app-wide
    appRoutingProviders,
    VersionsService, MessageService, AccountService,
    ProjectsService, ProfileService, BlogPostsService,
    TagSuggestService, UtilsService, S3Service,
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
