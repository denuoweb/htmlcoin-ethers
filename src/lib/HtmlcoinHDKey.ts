import { HDNode } from '@ethersproject/hdnode';
import { configureHtmlcoinAddressGeneration } from './helpers/utils';
import { HtmlcoinWallet } from './HtmlcoinWallet';

export class HtmlcoinHDKey {
    private readonly _hdkey: HDNode;

    static fromMasterSeed(seedBuffer: Buffer): HtmlcoinHDKey {
        const hdnode = configureHtmlcoinAddressGeneration(HDNode.fromSeed("0x" + seedBuffer.toString('hex')));
        return new HtmlcoinHDKey(hdnode);
    }

    static fromExtendedKey(base58Key: string): HtmlcoinHDKey {
        const hdnode = configureHtmlcoinAddressGeneration(HDNode.fromExtendedKey("0x" + base58Key));
        return new HtmlcoinHDKey(hdnode);
    }

    constructor(hdkey: HDNode) {
        this._hdkey = hdkey;
        configureHtmlcoinAddressGeneration(hdkey);
    }

    privateExtendedKey(): Buffer {
        if (!this._hdkey.privateKey) {
            throw new Error('This is a public key only wallet');
        }
        return Buffer.from(this._hdkey.extendedKey);
    }

    publicExtendedKey(): Buffer {
        return Buffer.from(this._hdkey.neuter().extendedKey);
    }

    derivePath(path: string): HtmlcoinHDKey {
        return new HtmlcoinHDKey(
            configureHtmlcoinAddressGeneration(HDNode.fromExtendedKey(this._hdkey.extendedKey).derivePath(path))
        );
    }

    deriveChild(index: number): HtmlcoinHDKey {
        return new HtmlcoinHDKey(
            // @ts-ignore
            configureHtmlcoinAddressGeneration(HDNode.fromExtendedKey(this._hdkey.extendedKey)._derive(index))
        );
    }

    getWallet(): HtmlcoinWallet {
        return new HtmlcoinWallet(configureHtmlcoinAddressGeneration(HDNode.fromExtendedKey(this._hdkey.extendedKey)));
    }
}