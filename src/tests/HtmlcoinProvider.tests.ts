// @ts-nocheck
const { HtmlcoinProvider } = require("../../build/main/lib/HtmlcoinProvider");

const provider = new HtmlcoinProvider("http://localhost:23890");

describe("HtmlcoinProvider", function () {
    it("can grab UTXOs for an address", async function () {
        await provider.getUtxos("0x7926223070547D2D15b2eF5e7383E541c338FfE9", "1.0");
    });
})