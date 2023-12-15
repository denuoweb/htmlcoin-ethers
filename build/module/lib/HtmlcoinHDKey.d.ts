/// <reference types="node" />
import { HDNode } from '@ethersproject/hdnode';
import { HtmlcoinWallet } from './HtmlcoinWallet';
export declare class HtmlcoinHDKey {
    private readonly _hdkey;
    static fromMasterSeed(seedBuffer: Buffer): HtmlcoinHDKey;
    static fromExtendedKey(base58Key: string): HtmlcoinHDKey;
    constructor(hdkey: HDNode);
    privateExtendedKey(): Buffer;
    publicExtendedKey(): Buffer;
    derivePath(path: string): HtmlcoinHDKey;
    deriveChild(index: number): HtmlcoinHDKey;
    getWallet(): HtmlcoinWallet;
}
