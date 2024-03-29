import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminMissionsComponent } from './admin/admin-missions/admin-missions.component';
import { SignComponent } from './authentication/sign/sign.component';
import { FooterComponent } from './footer/footer.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ContactComponent } from './contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from './map/map.component';
import { SingleMissionComponent } from './single-mission/single-mission.component';
import { VariablesGlobales } from './models/variablesGlobales';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreationComponent } from './missions/creation/creation.component';
import { VisualisationComponent } from './missions/visualisation/visualisation.component';
import { UserCreationComponent } from './users/user-creation/user-creation.component';
import { UserProfilComponent } from './users/user-profil/user-profil.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AdminDashboardComponent,
    AdminMissionsComponent,
    SignComponent,
    FooterComponent,
    NotfoundComponent,
    ContactComponent,
    MapComponent,
    SingleMissionComponent,
    CreationComponent,
    VisualisationComponent,
    UserCreationComponent,
    UserProfilComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [VariablesGlobales],
  bootstrap: [AppComponent]
})
export class AppModule { }
