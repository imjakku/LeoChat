import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'http://localhost:8002/chat';

  constructor(private http: HttpClient) { }

  getChatResponse(userInput: string): Observable<any> {
    const body = { user_input: userInput };
    return this.http.post<any>(this.apiUrl, body);
  }
}
