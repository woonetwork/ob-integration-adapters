import type { BasePoolState } from "../../base/BasePoolState";

export interface WOOFiPoolState extends BasePoolState {
    feeRate0: bigint;
    feeRate1: bigint;
    maxGamma0: bigint;
    maxGamma1: bigint;
    maxNotionalSwap0: bigint;
    maxNotionalSwap1: bigint;
    capBal0: bigint;
    capBal1: bigint;
    price0: bigint;
    price1: bigint;
    spread0: bigint;
    spread1: bigint;
    coeff0: bigint;
    coeff1: bigint;
    woFeasible0: boolean;
    woFeasible1: boolean;
    decimals0: bigint;
    decimals1: bigint;
    quoteReserve: bigint;
}
