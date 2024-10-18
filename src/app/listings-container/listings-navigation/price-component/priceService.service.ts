import { Injectable, signal } from "@angular/core";

@Injectable()
export class PriceService {
minPrice=signal('');
maxPrice=signal('');
}