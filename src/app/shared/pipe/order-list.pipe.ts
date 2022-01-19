import { Pipe, PipeTransform } from '@angular/core';
import { TrackModel } from '../../core/models/tracks.model';

@Pipe({
  name: 'orderList'
})
export class OrderListPipe implements PipeTransform {

  transform(value: Array<any>, args:string | null = null,sort:string = 'asc'): TrackModel[] {
    try{
      if (args === null){
        return value;
      } else {
        const tmbList = value.sort((a, b) => {
          if(a[args] < b[args]){
            return -1;
          }
          else if (a[args] === b[args]){
            return 0;
          }
          else if (a[args] > b[args]) {
            return 1;
          }
          return 1
        });
        return tmbList
      }
    }catch(e){
      console.log('Algo paso!');
      return value
    }
  }

}
