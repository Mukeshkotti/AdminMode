import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'category'
})
export class CategoryPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if(searchText === 'active'){
            searchText = '1'
        } else if(searchText === 'inactive'){
            searchText = '0'
        }

        if (!items) return [];
        if (!searchText) return items;
        return items.filter(it => {
            return it.status.includes(searchText);
        });
    }
}