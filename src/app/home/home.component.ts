import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../chat.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, NgClass, CommonModule, NgxSpinnerModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userInput: string = '';
  context: string = "";
  messages: { sender: string, text: any }[] = [];
  secondAttribute: any = "";
  data: string = "";
  isLoading: boolean = false;

  constructor(private chatService: ChatService, private spinner: NgxSpinnerService) { }

  sendMessage() {
    if (this.userInput.trim()) {
      this.userInput = this.userInput.replace(/[\r\n]+$/, '').trim();
      this.data = this.userInput;
      this.messages.push({ sender: 'user', text: this.data });
      this.userInput = '';
      this.isLoading = true;
      this.spinner.show();
      this.chatService.getChatResponse(this.data, this.context).subscribe(response => {
        const responseKeys = Object.keys(response);
        this.secondAttribute = response[responseKeys[1]];
        console.log("Second attribute: ", this.secondAttribute);
        this.messages.push({ sender: 'bot', text: this.secondAttribute });
        this.isLoading = false;
        this.spinner.hide();
      },
        err => {
          this.isLoading = false;
          this.spinner.hide();
        });
      console.log(this.messages);
    }
  }
}
