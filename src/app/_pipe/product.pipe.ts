import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'productFilter'
})
export class ProductPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        return items.filter(it => {
            return it.category_id.includes(searchText);
        });
    }
}