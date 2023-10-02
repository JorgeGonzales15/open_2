import { Component, OnInit } from '@angular/core';
import { Record } from 'src/app/models/record.model';
import { Center } from 'src/app/models/center.model';
import { RecordService } from 'src/app/services/record.service';
import { CenterService } from 'src/app/services/center.service';
import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  participant: Record = {} as Record;
  centerName: Center = {} as Center;

  constructor (private record: RecordService, private center: CenterService){}

  ngOnInit(): void {
    this.getParticipant().subscribe((centerId) => {
      this.getMarathonCenter(centerId);
    });
  }

  getParticipant(): Observable<number> {
    return this.record.getList().pipe(
      map((participants) => {
        const topParticipant = participants.find((p) => p.ranking === 1);
        if (topParticipant) {
          this.participant = topParticipant;
          return this.participant.centerId;
        }
        return 0; // Handle the case when no participant is found
      })
    );
  }

  getMarathonCenter(iD: number): void{
    this.center.getList().subscribe(centers => {
      const marathonCenter = centers.find(c => c.id === iD);
      if (marathonCenter) {
        this.centerName = marathonCenter;
      }
    });   
  }

  formatRecordTime(record: Record): string {
    const time = new Date(record.recordTime);
    const hours = time.getUTCHours().toString().padStart(2, '0');
    const minutes = time.getUTCMinutes().toString().padStart(2, '0');
    const seconds = time.getUTCSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }
  
}