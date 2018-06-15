/// <reference path="../vendor.d.ts"/>

import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {HttpModule, JsonpModule} from '@angular/http';

import { routing,
         appRoutingProviders } from './app.routing';

import {CombineComponents} from './app.component';
import {BaseComponent} from './components/base/base.component';
import {RouletteComponent} from './components/roulette/roulette.component';

import {DashboardComponent} from './admin/components/base/base.component';
import {AccountSettingsComponent} from './admin/components/AccountSettings/AccountSettings.component';
import {BlogCtrlCenterComponent} from './admin/components/BlogCtrlCenter/BlogCtrlCenter.component';
import {ProfileCtrlCenterComponent} from './admin/components/ProfileCtrlCenter/ProfileCtrlCenter.component';
import {ProjectsCtrlCenterComponent} from './admin/components/ProjectsCtrlCenter/ProjectsCtrlCenter.component';
import {VersionsCtrlCenterComponent} from './admin/components/VersionsCtrlCenter/VersionsCtrlCenter.component';

import {ProjectComponent} from './projects/components/base/base.component';
import {DownloadWishlistEbooksComponent} from './projects/download-wishlist-ebooks/components/base/base.component';

import {VersionComponent} from './versions/components/base/base.component';
import {VersionCubicComponent} from './versions/version-cubic/components/base/base.component';
import {VersionMaterialComponent} from './versions/version-material/components/base/base.component';
import {VersionTypographyComponent} from './versions/version-typography/components/base/base.component';

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

