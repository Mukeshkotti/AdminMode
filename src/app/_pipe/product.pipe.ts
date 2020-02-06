import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'productFilter'
})
export class ProductPipe implements PipeTransform {
    transform(items: any[], searchText: number): any[] {
        if (!items) return [];
        if (!Number(searchText)) return items;
        console.log('---------------------')
        items.map(it=> console.log(it.category_id, it.id))
        console.log('---------------------------')
        return items.filter(it => it.category_id ===  Number(searchText));
    }
}