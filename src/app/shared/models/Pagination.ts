export interface Pagination<T>{
    "count": number,
    "pageSize": number,
    "pageIndex": number,
    "data" : T[]
}