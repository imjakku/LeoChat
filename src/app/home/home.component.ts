import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userInput: string = '';
  context: string = "";
  messages: { sender: string, text: string }[] = [];

  constructor(private chatService: ChatService) { }

  sendMessage() {
    if (this.userInput.trim()) {
      this.messages.push({ sender: 'user', text: this.userInput });
      this.chatService.getChatResponse(this.userInput, this.context).subscribe(response => {
        this.messages.push({ sender: 'bot', text: response });
      });
      this.userInput = '';
    }
  }
}
