import { Component, ViewChild, OnInit } from '@angular/core';
//services & models
import { RecordService } from 'src/app/services/record.service';
import { Record } from 'src/app/models/record.model';
import { CenterService } from 'src/app/services/center.service';
import { Center } from 'src/app/models/center.model';
//material
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})

export class RecordsComponent implements OnInit {
  dataSource = new MatTableDataSource<Record>();
  displayedColumns: string[] = ['participantId', 'firstName', 'lastName', 'marathonCenterName', 'ranking', 'recordTime'];

  centers: Center[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private recordService: RecordService,
    private centerService: CenterService
  ) {}

  ngOnInit(): void {
    this.getAllRecords();
    this.getCenters();
  }

  getAllRecords() {
    this.recordService.getList().subscribe({
      next: (res) => {
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(res);
      },
      error: console.log,
    });
  }
  getCenters() {
    this.centerService.getList().subscribe({
      next: (res) => {
        this.centers = res;
      },
      error: console.log,
    });
  }
  getCenterName(centerId: number): string {
    const center = this.centers.find((c) => c.id === centerId);
    return center ? center.name : '';
  }
}