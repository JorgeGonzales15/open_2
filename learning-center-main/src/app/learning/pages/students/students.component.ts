import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {StudentsService} from "../../services/students.service";
import {Student} from "../../model/student";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit, AfterViewInit {

  // Attributes

  studentData: Student;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'age', 'address', 'actions'];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;
  isEditMode: boolean;
  constructor(private studentsService: StudentsService) {
    this.studentData = {} as Student;
    this.dataSource = new MatTableDataSource<any>();
    this.isEditMode = false;
  }

  // Private methods

  private resetEditState() {
    this.isEditMode = false;
    this.studentData = {} as Student;
  }

  // CRUD Actions

  private getAllStudents() {
    this.studentsService.getAll().subscribe((response: any) => {
      this.dataSource = response;
    });
  }

  private addStudent() {
    this.studentData.id = 0;
    this.studentsService.create(this.studentData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((s: Student) => { return s;});
    });
  }

  private updateStudent() {
    let student = this.studentData;
    this.studentsService.update(student.id, student).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((s: Student) => {
        if (s.id === response.id) {
          s = response;
        }
        return s;
      });
    });
  }

  private deleteStudent(id: number) {
    this.studentsService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((s: Student) => { return s.id !== id ? s : false});
    });
  }

  // UI Event Handlers

  onEditItem(element: Student) {
    this.studentData = element;
    this.isEditMode = true;
  }

  onCancelEdit() {
    this.isEditMode = false;
    this.getAllStudents();
  }

  onDeleteItem(element: Student) {
    this.deleteStudent(element.id);
  }

  onStudentAdded(student: Student) {
    this.studentData = student;
    this.addStudent();
    this.resetEditState();
  }

  onStudentUpdated(student: Student) {
    this.studentData = student;
    this.updateStudent();
    this.resetEditState();
  }

  // Component Lifecycle Event Handlers

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllStudents();
  }

}
