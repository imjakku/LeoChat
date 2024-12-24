import { CommonModule, JsonPipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, NgClass, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userInput: string = '';
  context: string = "";

  messages: { sender: string, text: any }[] = [];
  botRes: any;
  secondAttribute: any = "";
  constructor(private chatService: ChatService) { }

  sendMessage() {
    if (this.userInput.trim()) {
      this.messages.push({ sender: 'user', text: this.userInput });
      this.chatService.getChatResponse(this.userInput, this.context).subscribe(response => {
        const responseKeys = Object.keys(response);
        this.secondAttribute = response[responseKeys[1]];
        console.log("Second attribute: ", this.secondAttribute);
        this.messages.push({ sender: 'bot', text: this.secondAttribute });
      });
      console.log(this.messages);
      this.userInput = '';
    }
  }



}
