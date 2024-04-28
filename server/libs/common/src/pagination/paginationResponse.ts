import { PaginationRequest } from "./paginationRequest";

export class PaginationResponse {
    page: number;
    total: number;
    limit: number;

    constructor(total: number, data: unknown[], pageRequest: PaginationRequest) {
        this.total = Number(total);
        this.page = pageRequest.page;
        this.limit = data.length;
    }
}