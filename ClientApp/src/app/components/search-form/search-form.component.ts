import { Component } from '@angular/core';
import { ComponentsCommunicationService } from 'src/app/services/components-communication.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {
  constructor(private componentsCommunicationService: ComponentsCommunicationService) {}

  sendMessage() {
    this.componentsCommunicationService.sendMessage(JSON.stringify({valore: 9999}));
  }
}
