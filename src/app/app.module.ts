/// <reference path="../vendor.d.ts"/>

import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {HttpModule, JsonpModule} from '@angular/http';

import { routing,
         appRoutingProviders } from './app.routing';

import {CombineComponents} from './app.component';
import {BaseComponent} from './components/baseComponent/baseComponent';
import {RouletteComponent} from './components/rouletteComponent/rouletteComponent';

import {DashboardComponent} from './admin/components/baseComponent/baseComponent';
import {AccountSettingsComponent} from './admin/components/AccountSettingsComponent/AccountSettingsComponent';
import {BlogCtrlCenterComponent} from './admin/components/BlogCtrlCenterComponent/BlogCtrlCenterComponent';
import {ProfileCtrlCenterComponent} from './admin/components/ProfileCtrlCenterComponent/ProfileCtrlCenterComponent';
import {ProjectsCtrlCenterComponent} from './admin/components/ProjectsCtrlCenterComponent/ProjectsCtrlCenterComponent';
import {VersionsCtrlCenterComponent} from './admin/components/VersionsCtrlCenterComponent/VersionsCtrlCenterComponent';

import {ProjectComponent} from './projects/components/baseComponent/baseComponent';
import {DownloadWishlistEbooksComponent} from './projects/download-wishlist-ebooks/components/baseComponent/baseComponent';

import {VersionComponent} from './versions/components/baseComponent/baseComponent';
import {VersionCubicComponent} from './versions/version-cubic/components/baseComponent/baseComponent';
import {VersionMaterialComponent} from './versions/version-material/components/baseComponent/baseComponent';
import {VersionTypographyComponent} from './versions/version-typography/components/baseComponent/baseComponent';

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
    CombineComponents,
    BaseComponent,
    RouletteComponent,
    DashboardComponent,
    AccountSettingsComponent,
    BlogCtrlCenterComponent,
    ProfileCtrlCenterComponent,
    ProjectsCtrlCenterComponent,
    VersionsCtrlCenterComponent,
    ProjectComponent,
    DownloadWishlistEbooksComponent,
    VersionComponent,
    VersionCubicComponent,
    VersionMaterialComponent,
    VersionTypographyComponent
  ],
  providers: [ //services injected here are singletons available app-wide
    appRoutingProviders,
    VersionsService, MessageService, AccountService,
    ProjectsService, ProfileService, BlogPostsService,
    TagSuggestService, UtilsService, S3Service
  ],
  bootstrap: [ CombineComponents ]
})

export class AppModule { }

