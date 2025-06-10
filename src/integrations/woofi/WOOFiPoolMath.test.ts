import { describe, expect, test } from "bun:test";
import { parseEther, parseUnits, zeroAddress } from "viem";
import { WOOFiPoolMath } from "./WOOFiPoolMath";
import type { WOOFiPoolState } from "./WOOFiPoolState";

describe("WOOFiPoolMath", () => {
    const poolMath = new WOOFiPoolMath();
    const poolState: WOOFiPoolState = {
        address: zeroAddress,
        token0: zeroAddress,
        token1: zeroAddress,
        reserve0: 100000000000000000000n,
        reserve1: 200000000000000000000n,
        feeRate0: 25n,
        feeRate1: 25n,
        maxGamma0: 3000000000000000n,
        maxGamma1: 3000000000000000n,
        maxNotionalSwap0: 1000000000000n,
        maxNotionalSwap1: 1000000000000n,
        capBal0: 2000000000000000000000n,
        capBal1: 2000000000n,
        price0: 175000000000n,
        price1: 9200000000000n,
        spread0: 941000000000000n,
        spread1: 1050000000000000n,
        coeff0: 1660000000n,
        coeff1: 1660000000n,
        woFeasible0: true,
        woFeasible1: true,
        decimals0: 18n,
        decimals1: 8n,

    };

    test("swapExactInput zeroToOne", () => {
        expect(poolMath.swapExactInput(poolState, true, parseEther("10"))).toBe(
            parseUnits("0.18975966", 8),
        );
    });

    test("swapExactInput oneToZero", () => {
        expect(poolMath.swapExactInput(poolState, false, parseUnits("1", 8))).toBe(
            parseEther("52.431947583283703063"),
        );
    });

    test("swapExactOutput zeroToOne", () => {
        expect(poolMath.swapExactOutput(poolState, true, parseUnits("1", 8))).toBe(
            parseEther("52.711323470852160847"),
        );
    });

    test("swapExactOutput oneToZero", () => {
        expect(poolMath.swapExactOutput(poolState, false, parseEther("10"))).toBe(
            parseUnits("0.19067625", 8),
        );
    });

    test("spotPriceWithoutFee zeroToOne", () => {
        expect(poolMath.spotPriceWithoutFee(poolState, true)).toBe(0.01897695);
    });

    test("spotPriceWithoutFee oneToZero", () => {
        expect(poolMath.spotPriceWithoutFee(poolState, false)).toBe(52.4319475832837);
    });
});
