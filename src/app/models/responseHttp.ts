export interface ResponseHttp {
    status: boolean,
    errors: {
        message? : string
    },
    data : {
        items: any[],
        item?: any,
        number?: number,
        history?: any[],
        exist?: boolean
    }
}
//обобщенная модель по забору общих данных