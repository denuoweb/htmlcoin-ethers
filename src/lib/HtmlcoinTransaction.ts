import { BN } from "bn.js"
import { HtmlcoinWallet } from "./HtmlcoinWallet";
import { TransactionRequest } from "@ethersproject/abstract-provider";

export interface Address {
    equals(address: Address): boolean;
    isZero(): boolean;
    isPrecompileOrSystemAddress(): boolean;
    toString(): string;
    toBuffer(): Buffer;
}

export interface TxData {
    nonce: typeof BN;
    gasLimit: typeof BN;
    gasPrice: typeof BN;
    to?: Address;
    value: typeof BN;
    data: Buffer;
    v: typeof BN;
    r: typeof BN;
    s: typeof BN;
    type: any;
}

export class HtmlcoinTransaction {
    // private readonly _type;
    private tx?: string;
    readonly nonce: typeof BN;
    readonly gasLimit: typeof BN;
    readonly gasPrice: typeof BN;
    readonly to?: Address;
    readonly value: typeof BN;
    readonly data: Buffer;
    readonly v?: typeof BN;
    readonly r?: typeof BN;
    readonly s?: typeof BN;

    constructor(txData: TxData) {
        const { nonce, gasLimit, gasPrice, to, value, data } = txData;
        // this._type = type;
        this.nonce = nonce;
        this.gasLimit = gasLimit;
        this.gasPrice = gasPrice;
        this.to = to;
        this.value = value;
        this.data = data;
    }

    static fromTxData(txData: TxData): HtmlcoinTransaction {
        return new HtmlcoinTransaction(txData);
    }

    async sign(privateKey: HtmlcoinWallet): Promise<HtmlcoinTransaction> {
        const htmlcoinTransaction = {
            to: this.to?.toString(),
            from: privateKey.getAddressString(),
            nonce: 0,
            gasLimit: this.gasLimit.toString(),
            gasPrice: this.gasPrice.toString(),
            data: this.data,
            // chainId: 
        } as TransactionRequest
        if (this.value) {
            htmlcoinTransaction.value = this.value.toString();
        }
        this.tx = await privateKey.signTransaction(htmlcoinTransaction)
        return this;
    }

    serialize(): Buffer {
        if (!this.tx) {
            throw new Error("Require signing first");
        }
        return Buffer.from(this.tx, "hex");
    }
}