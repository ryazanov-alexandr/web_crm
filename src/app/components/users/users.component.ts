import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users/users.service';
import { ModalUsersComponent } from '../childComponents/modal-users/modal-users.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {

  users : User[];
  user : User;

  dataSource = new MatTableDataSource<User>();

  constructor(
    private usersService : UsersService,
    private modalService : MatDialog,
    private toastService : MatSnackBar,
    private ref : MatDialogRef<ModalUsersComponent>,
  ) { }

  ngOnInit(): void {
    this.getSources();
  }

  getSources() {
    this.usersService.getUsers().subscribe((data: User[]) => {
      this.users = data;
      this.dataSource.data = this.users;
    })
  }

  openUserModal() {
    this.ref = this.modalService.open(ModalUsersComponent, {
      data : {
        sources : this.users,
      }, 
      width : '50%'
    });

    // this.ref.componentInstance.onChange.subscribe(() => {
    //   this.dataSource.data = this.users;
    // })
  }

  editSource(source : User, index : number) {
    this.user = source;
    this.ref = this.modalService.open(ModalUsersComponent, {
      data : {
        source : this.user,
        sources : this.users,
      },
      width : '50%'
    });

    // this.ref.componentInstance.onChange.subscribe(() => {
    //   this.dataSource.data = this.users;
    // })
  }

  deleteSource(source : User, index : number) {
    if(confirm("Удалить?")) {
      if(index) {
        // this.usersService.deleteUsers(source).subscribe(() => {

        //   this.users.splice(index, 1);
        //   this.dataSource.data = this.users;

        //   this.toastService.open("Источник удалён", "Закрыть", {
        //     duration : 2000
        //   });
        // });
      }
    }
  }

}
