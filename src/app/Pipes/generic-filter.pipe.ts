import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'genericFilter'
})

export class GenericFilterPipe implements PipeTransform {

    transform(item: any, targetProperty?: any, searchValue?: any): any {

        if(!item || !targetProperty) {
            return null;
        }
        if(!searchValue) {
            return item;
        }

        searchValue = searchValue.toLocaleLowerCase();

        return item.filter(function(data) {
            return data[targetProperty].toLocaleLowerCase().includes(searchValue);
        });
    }
}