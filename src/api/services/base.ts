export interface ICrudOption {
    page?: any;
    take?: number;
    skip?: number;
    order?: any;
    select?: any;
    where?: any;
    relations?: any;
    search?: string;
    cache?: boolean | number;
}

export interface ISort {
    type: string;
    value: 'DESC' | 'ASC';
}

export interface IPrice {
    min: number;
    max: number;
}

export interface ILocation {
    provinceCode: string;
    districtCode: string;
}

export class CListData<T> {
    public count: number;
    public list: T[];
}

export interface INotify {
    user_id?: string;
    user_ids?: string;
    src: ISrcNotify;
    activity_type: number;
    dst: IDstNotify;
    dst_type: number;
    at_time: string;
}

export interface ISrcNotify {
    id: string;
    name: string;
    avatar: string;
}

export interface IDstNotify {
    id: string;
    name: string;
}

export enum EMode {
    'SINGLE',
    'MULTI',
}
