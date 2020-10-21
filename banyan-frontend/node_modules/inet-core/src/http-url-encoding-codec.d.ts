/**
 * Copyright (c) 2019 by Vy Nguyen (ntvy@inetcloud.vn)
 *
 * Created by ntvy on 14:21 28/02/2019
 *
 */
import { HttpParameterCodec } from "@angular/common/http";
export declare class HttpUrlEncodingCodec implements HttpParameterCodec {
    encodeKey(k: string): string;
    encodeValue(v: string): string;
    decodeKey(k: string): string;
    decodeValue(v: string): string;
}
