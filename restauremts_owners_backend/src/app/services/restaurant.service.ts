import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private baseUrl = 'http://localhost:3000/api/restaurants'; // Backend API base URL

  constructor(private http: HttpClient) {}

  // Add restaurant details to the decision table
  addToDecision(restaurant: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/decision`, restaurant);
  }
  // Fetch pending restaurants
  getPendingRestaurants(): Observable<any> {
    return this.http.get(`${this.baseUrl}/decision`);
  }

  // Approve a restaurant
  approveRestaurant(id: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/approve/${id}`, {});
  }

  // Reject a restaurant
  rejectRestaurant(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/reject/${id}`);
  }
}