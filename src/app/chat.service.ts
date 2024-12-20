import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'http://127.0.0.1:8000/chat';

  constructor(private http: HttpClient) { }

  getChatResponse(userInput: string, context: string): Observable<any> {
    const body = { user_input: userInput, context: context };
    return this.http.post<any>(this.apiUrl, body);
  }
}
