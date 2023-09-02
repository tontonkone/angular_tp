import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EmitterService {
    private taskCreatedSubject = new Subject<void>();

    taskCreated$ = this.taskCreatedSubject.asObservable();

    notifyTaskCreated() {
        this.taskCreatedSubject.next();
    }
}
