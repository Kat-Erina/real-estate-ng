import { Injectable, signal } from "@angular/core";

@Injectable()
export class AreaService {
    minArea=signal('');
    maxArea=signal('');
}