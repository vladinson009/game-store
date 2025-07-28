import { Component, NgModule, OnInit, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ModerateService } from '../../../core/services/moderate.service';
import { AuthUserResponse } from '../../../models/user';
import { MatTableModule } from '@angular/material/table';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-roles-panel',
  imports: [
    MatFormFieldModule,
    MatInput,
    MatTableModule,
    MatOption,
    MatSelect,
    MatButton,
    FormsModule,
  ],
  templateUrl: './roles-panel.html',
  styleUrl: './roles-panel.css',
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
