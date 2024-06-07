import { Injectable } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private scrollToElementSource = new BehaviorSubject<string | null>(null);
  scrollToElement$ = this.scrollToElementSource.asObservable();

  constructor(private viewportScroller: ViewportScroller) {}

  scrollToElement(elementId: string): void {
    this.scrollToElementSource.next(elementId);
  }

  executeScroll(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
