import { PaginationRequest } from "./paginationRequest";

type Pagination = {
    page: number;
    total: number;
    limit: number;
}
export class PaginationResponse<T> {
    pagination: Pagination;
    data: T[];

    constructor({ total, data, pageRequest }: {
        total: number,
        data: T[],
        pageRequest: PaginationRequest
    }) {
        this.pagination = {
            page: pageRequest.page,
            total: Number(total),
            limit: data.length
        };
        this.data = data;
    }
}