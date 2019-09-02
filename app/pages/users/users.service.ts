import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { users } from 'src/app/Models/Users/users';
import { environment } from 'src/environments/environment';

@Injectable()
export class UsersService {
    public url = "api/users";

    apiUrl = environment.apiBaseUrl + "Users";
    
    constructor(private http:HttpClient) { }
    

    
    xgetUsersList():Observable<users>{
        return this.http.get<users>(this.apiUrl,environment.httpOptions);
    }
    
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.url);
    }

    addUser(user:User){	    
        return this.http.post(this.url, user);
    }

    updateUser(user:User){
        return this.http.put(this.url, user);
    }

    deleteUser(id: number) {
        return this.http.delete(this.url + "/" + id);
    } 
} 