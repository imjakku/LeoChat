import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'http://172.29.57.207:8000/chat';

  constructor(private http: HttpClient) { }

  getChatResponse(userInput: string, context: string): Observable<any> {
    const body = { user_input: userInput, context: context };
    return this.http.post<any>(this.apiUrl, body);
  }
}
