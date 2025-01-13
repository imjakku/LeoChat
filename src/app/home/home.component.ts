import { CommonModule, NgClass } from '@angular/common';
import { Component, HostListener } from '@angular/core';
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
  data: string = "";
  context: string = "";
  messages: { sender: string, text: any }[] = [];
  secondAttribute: any = "";
  isLoading: boolean = false;
  showInputField: boolean = false;
  btnvisible: boolean = true;
  inputError: boolean = false;
  showBottomButton: boolean = false;
  errorIcon: boolean = false;
  constructor(private chatService: ChatService, private spinner: NgxSpinnerService) { }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.showBottomButton = ((window.document.body.scrollHeight - window.innerHeight) - window.scrollY) > 40;
  }

  sendMessage() {
    if (this.userInput.trim()) {
      this.isLoading = true;
      this.userInput = this.userInput.replace(/[\r\n]+$/, '').trim();
      this.data = this.userInput;
      this.messages.push({ sender: "user", text: this.userInput });
      this.userInput = "";
      this.spinner.show();

      this.chatService.getChatResponse(this.data, this.context).subscribe(response => {
        const responseKeys = Object.keys(response);
        this.secondAttribute = response[responseKeys[1]];
        console.log("Second attribute: ", this.secondAttribute);
        this.messages.push({ sender: "bot", text: this.secondAttribute });
        this.errorIcon = false;
        this.isLoading = false;
        this.spinner.hide();
      },
        err => {
          this.secondAttribute = "An error occurred. Either the engine you requested does not exist or there was another issue processing your request.";
          this.messages.push({ sender: "error", text: this.secondAttribute });
          this.errorIcon = true;
          this.isLoading = false;
          this.spinner.hide();
          console.log("Error");
        });
      console.log(this.messages);
    }
  }
  public visible = false;
  public inputValue: string = '';

  toggleLiveDemo() {
    this.visible = !this.visible;
  }
  handleSubmit() {
    console.log('Input Value:', this.inputValue);
    if (this.inputValue === "a") {
      this.btnvisible = false;
      this.toggleLiveDemo();
    } else {
      this.inputError = true;
      setTimeout(() => this.inputError = false, 500);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Selected file:', file);


      // Handle the file upload logic here
    }
  }

  scrollToBottom() {
    window.scrollTo({ top: window.document.body.scrollHeight - window.innerHeight, behavior: 'smooth' });
  }
}
