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
  userInput: string = "";
  context: string = "";
  messages: { sender: string, text: any }[] = [];
  secondAttribute: any = "";
  isLoading: boolean = false;
  showInputField: boolean = false;
  btnvisible: boolean = true;
  inputError: boolean = false;

  constructor(private chatService: ChatService, private spinner: NgxSpinnerService) { }

  sendMessage() {
    if (this.userInput.trim()) {
      this.isLoading = true;
      this.userInput = this.userInput.replace(/[\r\n]+$/, '').trim();
      this.messages.push({ sender: "user", text: this.userInput });
      this.userInput = "";

      this.spinner.show();
      this.chatService.getChatResponse(this.userInput, this.context).subscribe(response => {
        const responseKeys = Object.keys(response);
        this.secondAttribute = response[responseKeys[1]];
        console.log("Second attribute: ", this.secondAttribute);
        this.messages.push({ sender: "bot", text: this.secondAttribute });
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
  toggleInputField() {
    this.showInputField = !this.showInputField;
  }

  public visible = false;
  public inputValue: string = '';

  toggleLiveDemo() {
    console.log("hfce");
    this.visible = !this.visible;
  }
  handleSubmit() {
    console.log('Input Value:', this.inputValue);
    if (this.inputValue === "abc-def-ghi") {
      this.toggleLiveDemo();
    } else {
      this.inputError = true;
      setTimeout(() => this.inputError = false, 500);

    }
  }
}
