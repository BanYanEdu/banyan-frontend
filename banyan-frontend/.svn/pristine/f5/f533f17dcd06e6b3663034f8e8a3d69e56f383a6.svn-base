import { ReplyData } from "./ReplyData";
import { EXT_HASH_ALG } from "../Constants";
export interface SignedReplyData extends ReplyData {
    data?: SignedData;
}
export interface SignedData {
    signature?: string;
    signatures?: string[];
    serial?: string;
    cert?: string;
    hashAlg?: EXT_HASH_ALG;
}
