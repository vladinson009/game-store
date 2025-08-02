import type { AuthUserResponse, UserRole } from '../../models/user';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { authEndpoints } from '../../shared/constants/apiEndpoints';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root',
})
export class ModerateService {
  constructor(private http: HttpClient, private uiService: UiService) {}

  // Get all users from the server
  public getAllUsers(): Observable<AuthUserResponse[]> {
    return this.http.get<AuthUserResponse[]>(authEndpoints.getAll);
  }

  // Change roles if you are an admin
  public changeRole(userId: string, role: UserRole) {
    return this.http.put(authEndpoints.editRole(userId), { role }).pipe(
      finalize(() => {
        this.uiService.openSnackBar(
          `User with id ${userId} now has role: ${role}`
        );
      })
    );
  }
  // Delete users if you are an admin
  public deleteUser(userId: string) {
    return this.http.get(authEndpoints.deleteUser(userId)).pipe(
      finalize(() => {
        this.uiService.openSnackBar(`User with ID ${userId} was deleted`);
      })
    );
  }
}
