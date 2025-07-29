import type { AuthUserResponse } from '../../../models/user';

import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

// ? Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';

import { ModerateService } from '../../../core/services/moderate.service';
import slideAnimation from '../../../animations/slideAnimation';
@Component({
  selector: 'app-roles-panel',
  imports: [
    MatFormFieldModule,
    MatTableModule,
    MatOption,
    MatSelect,
    MatButton,
    FormsModule,
  ],
  templateUrl: './roles-panel.html',
  styleUrl: './roles-panel.css',
  animations: [slideAnimation(1000, 'Y')],
})
export class RolesPanel implements OnInit {
  users = signal<AuthUserResponse[] | undefined>(undefined);
  displayedColumns = ['username', 'email', '_id', 'role'];
  constructor(private moderateService: ModerateService) {}

  private getUsers() {
    this.moderateService.getAllUsers().subscribe((users) => {
      this.users.set(users);
    });
  }
  updateRole(user: AuthUserResponse) {
    this.moderateService.changeRole(user._id, user.role).subscribe();
  }
  deleteUser(id: string) {
    this.moderateService.deleteUser(id).subscribe();
    this.users.update((prevValue) => {
      return prevValue?.filter((el) => el._id !== id);
    });
  }

  ngOnInit() {
    this.getUsers();
  }
}
