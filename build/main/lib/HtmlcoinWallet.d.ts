/// <reference types="node" />
import { SerializeOptions } from './helpers/utils';
import { InputNonces, IntermediateWallet, HtmlcoinTransactionRequest } from './helpers/IntermediateWallet';
import { ProgressCallback } from "@ethersproject/json-wallets";
import { Bytes } from "@ethersproject/bytes";
import { Wordlist } from "@ethersproject/wordlists";
export declare const HTMLCOIN_BIP44_PATH = "m/44'/172'/0'/0/0";
export declare const SLIP_BIP44_PATH = "m/44'/172'/0'/0/0";
export declare const defaultPath = "m/44'/172'/0'/0/0";
export interface HtmlcoinWalletOptions {
    filterDust: boolean;
    disableConsumingUtxos: boolean;
    ignoreInputs: Array<string>;
    inputs: Array<string>;
    nonce: string;
}
export declare class IdempotencyError extends Error {
    constructor(message: string);
}
export declare class HtmlcoinWallet extends IntermediateWallet {
    private opts;
    private readonly htmlcoinProvider?;
    constructor(privateKey: any, provider?: any, opts?: HtmlcoinWalletOptions);
    protected serializeTransaction(utxos: Array<any>, neededAmount: string, tx: HtmlcoinTransactionRequest, transactionType: number, opts?: SerializeOptions): Promise<string>;
    getIdempotentNonce(serializedHexTransaction: string): InputNonces;
    /**
     * Override to build a raw HTMLCOIN transaction signing UTXO's
     */
    signTransaction(transaction: HtmlcoinTransactionRequest): Promise<string>;
    getUtxos(from?: string, neededAmount?: number, types?: string[]): Promise<any[]>;
    private do;
    getPrivateKey(): Buffer;
    getPrivateKeyString(): string;
    getPublicKey(): Buffer;
    getPublicKeyString(): string;
    getAddressBuffer(): Buffer;
    getAddressString(): string;
    getChecksumAddressString(): string;
    static fromPrivateKey(privateKey: string): HtmlcoinWallet;
    /**
     *  Static methods to create Wallet instances.
     */
    static createRandom(options?: any): IntermediateWallet;
    static fromEncryptedJson(json: string, password: Bytes | string, progressCallback?: ProgressCallback): Promise<IntermediateWallet>;
    static fromEncryptedJsonSync(json: string, password: Bytes | string): IntermediateWallet;
    /**
     * Create a HtmlcoinWallet from a BIP44 mnemonic
     * @param mnemonic
     * @param path HTMLCOIN uses two different derivation paths and recommends SLIP_BIP44_PATH for external wallets, core wallets use HTMLCOIN_BIP44_PATH
     * @param wordlist
     * @returns
     */
    static fromMnemonic(mnemonic: string, path?: string, wordlist?: Wordlist): IntermediateWallet;
}
