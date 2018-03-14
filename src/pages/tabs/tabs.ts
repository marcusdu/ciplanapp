import { Component, ViewChild } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { Nav, NavController, Tabs, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild('tab') tabRef: Tabs;

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  private selectedTab: number;

  constructor( public navCtrl: NavController, public navParam: NavParams ) {
    this.selectedTab = this.navParam.get('selectTab') || 0;
  }

  ionViewWillEnter(){
    if( this.selectedTab ){
      this.tabRef.select(this.selectedTab);
    }
  }
}
