import { BasePoolMath } from "../../base/BasePoolMath";
import { ORACLE_PRICE_DECIMALS, QUOTE_TOKEN_ADDRESS, QUOTE_TOKEN_DECIMALS } from "./constants";
import type { WOOFiPoolState } from "./WOOFiPoolState";

export class WOOFiPoolMath extends BasePoolMath<WOOFiPoolState> {
    private BASE_FEE_RATE = 100000n;

    override swapExactInput(
        pool: WOOFiPoolState,
        zeroToOne: boolean,
        amountIn: bigint,
    ): bigint {
        const [fromToken, toToken] = zeroToOne
            ? [pool.token0, pool.token1]
            : [pool.token1, pool.token0];
        
        if (fromToken === QUOTE_TOKEN_ADDRESS) {
            // toToken is baseToken
            return this.sellQuoteInput(pool, zeroToOne, amountIn);
        } else if (toToken === QUOTE_TOKEN_ADDRESS) {
            // fromToken is baseToken
            return this.sellBaseInput(pool, zeroToOne, amountIn);
        } else {
            // fromToken and toToken both are baseToken
            return this.swapBaseToBaseInput(pool, zeroToOne, amountIn);
        }
    }

    private sellQuoteInput(pool: WOOFiPoolState, zeroToOne: boolean, quoteAmount: bigint): bigint {
        let baseFeeRate = zeroToOne ? pool.feeRate1 : pool.feeRate0;
        let baseMaxGamma = zeroToOne ? pool.maxGamma1 : pool.maxGamma0;
        let baseMaxNotionalSwap = zeroToOne ? pool.maxNotionalSwap1 : pool.maxNotionalSwap0;
        // let baseCapBal = zeroToOne ? pool.capBal1 : pool.capBal0;

        let basePrice = zeroToOne ? pool.price1 : pool.price0;
        let baseSpread = zeroToOne ? pool.spread1 : pool.spread0;
        let baseCoeff = zeroToOne ? pool.coeff1 : pool.coeff0;
        let baseWoFeasible = zeroToOne ? pool.woFeasible1 : pool.woFeasible0;
        let baseDecimals = zeroToOne ? pool.decimals1 : pool.decimals0;

        let swapFee = quoteAmount * baseFeeRate / this.BASE_FEE_RATE;
        let quoteAmountAfterFee = quoteAmount - swapFee;

        let baseAmount = this.calcBaseAmountSellQuoteInput(
            quoteAmountAfterFee, baseMaxGamma, baseMaxNotionalSwap, basePrice, baseSpread, baseCoeff, baseWoFeasible, baseDecimals
        );

        return baseAmount;
    }

    private sellBaseInput(pool: WOOFiPoolState, zeroToOne: boolean, baseAmount: bigint): bigint {
        let baseFeeRate = zeroToOne ? pool.feeRate0 : pool.feeRate1;
        let baseMaxGamma = zeroToOne ? pool.maxGamma0 : pool.maxGamma1;
        let baseMaxNotionalSwap = zeroToOne ? pool.maxNotionalSwap0 : pool.maxNotionalSwap1;
        // let baseCapBal = zeroToOne ? pool.capBal0 : pool.capBal1;

        let basePrice = zeroToOne ? pool.price0 : pool.price1;
        let baseSpread = zeroToOne ? pool.spread0 : pool.spread1;
        let baseCoeff = zeroToOne ? pool.coeff0 : pool.coeff1;
        let baseWoFeasible = zeroToOne ? pool.woFeasible0 : pool.woFeasible1;
        let baseDecimals = zeroToOne ? pool.decimals0 : pool.decimals1;

        let quoteAmount = this.calcQuoteAmountSellBaseInput(
            baseAmount, baseMaxGamma, baseMaxNotionalSwap, basePrice, baseSpread, baseCoeff, baseWoFeasible, baseDecimals
        );

        let swapFee = quoteAmount * baseFeeRate / this.BASE_FEE_RATE;
        return quoteAmount - swapFee;
    }

    private swapBaseToBaseInput(pool: WOOFiPoolState, zeroToOne: boolean, base1Amount: bigint): bigint {
        let [base1FeeRate, base2FeeRate] = zeroToOne ? [pool.feeRate0, pool.feeRate1] : [pool.feeRate1, pool.feeRate0];
        let [base1MaxGamma, base2MaxGamma] = zeroToOne ? [pool.maxGamma0, pool.maxGamma1] : [pool.maxGamma1, pool.maxGamma0];
        let [base1MaxNotionalSwap, base2MaxNotionalSwap] = zeroToOne ? [pool.maxNotionalSwap0, pool.maxNotionalSwap1] : [pool.maxNotionalSwap1, pool.maxNotionalSwap0];

        let [base1Price, base2Price] = zeroToOne ? [pool.price0, pool.price1] : [pool.price1, pool.price0];
        let [base1Spread, base2Spread] = zeroToOne ? [pool.spread0, pool.spread1] : [pool.spread1, pool.spread0];
        let [base1Coeff, base2Coeff] = zeroToOne ? [pool.coeff0, pool.coeff1] : [pool.coeff1, pool.coeff0];
        let [base1WoFeasible, base2WoFeasible] = zeroToOne ? [pool.woFeasible0, pool.woFeasible1] : [pool.woFeasible1, pool.woFeasible0];
        let [base1Decimals, base2Decimals] = zeroToOne ? [pool.decimals0, pool.decimals1] : [pool.decimals1, pool.decimals0];

        let feeRate = base1FeeRate >= base2FeeRate ? base1FeeRate : base2FeeRate;
        let spread = base1Spread >= base2Spread ? base1Spread : base2Spread;

        let quoteAmount = this.calcQuoteAmountSellBaseInput(
            base1Amount, base1MaxGamma, base1MaxNotionalSwap, base1Price, spread, base1Coeff, base1WoFeasible, base1Decimals
        );

        let swapFee = quoteAmount * feeRate / this.BASE_FEE_RATE;
        let quoteAmountAfterFee = quoteAmount - swapFee;

        let base2Amount = this.calcBaseAmountSellQuoteInput(
            quoteAmountAfterFee, base2MaxGamma, base2MaxNotionalSwap, base2Price, spread, base2Coeff, base2WoFeasible, base2Decimals
        );

        return base2Amount;
    }

    private calcBaseAmountSellQuoteInput(
        quoteAmountAfterFee: bigint,
        baseMaxGamma: bigint,
        baseMaxNotionalSwap: bigint,
        basePrice: bigint,
        baseSpread: bigint,
        baseCoeff: bigint,
        baseWoFeasible: boolean,
        baseDecimals: bigint
    ): bigint {
        if (!baseWoFeasible) {
            throw new Error("WOOFiSwapLib: OracleInfeasible");
        }
        if (basePrice <= 0) {
            throw new Error("WOOFiSwapLib: OraclePriceHalted");
        }

        if (quoteAmountAfterFee > baseMaxNotionalSwap) {
            throw new Error("WOOFiSwapLib: NotionalSwapExceeded");
        }

        let gamma = quoteAmountAfterFee * baseCoeff / (10n ** QUOTE_TOKEN_DECIMALS);
        if (gamma > baseMaxGamma) {
            throw new Error("WOOFiSwapLib: GammaExceeded");
        }

        let baseUnit = 10n ** 18n;

        let baseAmount = ((
            (quoteAmountAfterFee * (10n ** baseDecimals) * (10n ** ORACLE_PRICE_DECIMALS)) / basePrice
        ) * (baseUnit - gamma - baseSpread)) / baseUnit / (10n ** QUOTE_TOKEN_DECIMALS);

        return baseAmount;
    }

    private calcQuoteAmountSellBaseInput(
        baseAmount: bigint,
        baseMaxGamma: bigint,
        baseMaxNotionalSwap: bigint,
        basePrice: bigint,
        baseSpread: bigint,
        baseCoeff: bigint,
        baseWoFeasible: boolean,
        baseDecimals: bigint
    ): bigint {
        if (!baseWoFeasible) {
            throw new Error("WOOFiSwapLib: OracleInfeasible");
        }
        if (basePrice <= 0) {
            throw new Error("WOOFiSwapLib: OraclePriceHalted");
        }

        let notionalSwap = (baseAmount * basePrice * (10n ** QUOTE_TOKEN_DECIMALS)) / (10n ** baseDecimals) / (10n ** ORACLE_PRICE_DECIMALS);
        if (notionalSwap > baseMaxNotionalSwap) {
            throw new Error("WOOFiSwapLib: NotionalSwapExceeded");
        }

        let gamma = (baseAmount * basePrice * baseCoeff) / (10n ** ORACLE_PRICE_DECIMALS) / (10n ** baseDecimals);
        if (gamma > baseMaxGamma) {
            throw new Error("WOOFiSwapLib: GammaExceeded");
        }

        let baseUnit = 10n ** 18n;

        let quoteAmount = (
            (
                (baseAmount * basePrice * (10n ** QUOTE_TOKEN_DECIMALS)) / (10n ** ORACLE_PRICE_DECIMALS) * (baseUnit - gamma - baseSpread)
            ) / baseUnit / (10n ** baseDecimals)
        );

        return quoteAmount;

    }

    override swapExactOutput(
        pool: WOOFiPoolState,
        zeroToOne: boolean,
        amountOut: bigint,
    ): bigint {
        // TODO: fix formula bug
        const [fromToken, toToken] = zeroToOne
            ? [pool.token0, pool.token1]
            : [pool.token1, pool.token0];
        
        if (fromToken === QUOTE_TOKEN_ADDRESS) {
            // toToken is baseToken
            return this.sellQuoteOutput(pool, zeroToOne, amountOut);
        } else if (toToken === QUOTE_TOKEN_ADDRESS) {
            // fromToken is baseToken
            return this.sellBaseOutput(pool, zeroToOne, amountOut);
        } else {
            // fromToken and toToken both are baseToken
            return this.swapBaseToBaseOutput(pool, zeroToOne, amountOut);
        }
    }

    private sellQuoteOutput(pool: WOOFiPoolState, zeroToOne: boolean, baseAmount: bigint) {
        let baseFeeRate = zeroToOne ? pool.feeRate1 : pool.feeRate0;
        let baseMaxGamma = zeroToOne ? pool.maxGamma1 : pool.maxGamma0;
        let baseMaxNotionalSwap = zeroToOne ? pool.maxNotionalSwap1 : pool.maxNotionalSwap0;
        // let baseCapBal = zeroToOne ? pool.capBal1 : pool.capBal0;

        let basePrice = zeroToOne ? pool.price1 : pool.price0;
        let baseSpread = zeroToOne ? pool.spread1 : pool.spread0;
        let baseCoeff = zeroToOne ? pool.coeff1 : pool.coeff0;
        let baseWoFeasible = zeroToOne ? pool.woFeasible1 : pool.woFeasible0;
        let baseDecimals = zeroToOne ? pool.decimals1 : pool.decimals0;

        let quoteAmountAfterFee = this.calcBaseAmountSellQuoteOutput(
            baseAmount, baseMaxGamma, baseMaxNotionalSwap, basePrice, baseSpread, baseCoeff, baseWoFeasible, baseDecimals
        );

        let quoteAmount = quoteAmountAfterFee / (this.BASE_FEE_RATE - baseFeeRate) / this.BASE_FEE_RATE;

        return quoteAmount;
    }

    private sellBaseOutput(pool: WOOFiPoolState, zeroToOne: boolean, quoteAmountAfterFee: bigint) {
        let baseFeeRate = zeroToOne ? pool.feeRate0 : pool.feeRate1;
        let baseMaxGamma = zeroToOne ? pool.maxGamma0 : pool.maxGamma1;
        let baseMaxNotionalSwap = zeroToOne ? pool.maxNotionalSwap0 : pool.maxNotionalSwap1;
        // let baseCapBal = zeroToOne ? pool.capBal0 : pool.capBal1;

        let basePrice = zeroToOne ? pool.price0 : pool.price1;
        let baseSpread = zeroToOne ? pool.spread0 : pool.spread1;
        let baseCoeff = zeroToOne ? pool.coeff0 : pool.coeff1;
        let baseWoFeasible = zeroToOne ? pool.woFeasible0 : pool.woFeasible1;
        let baseDecimals = zeroToOne ? pool.decimals0 : pool.decimals1;

        let quoteAmount = quoteAmountAfterFee / (this.BASE_FEE_RATE - baseFeeRate) / this.BASE_FEE_RATE;

        return this.calcQuoteAmountSellBaseOutput(
            quoteAmount, baseMaxGamma, baseMaxNotionalSwap, basePrice, baseSpread, baseCoeff, baseWoFeasible, baseDecimals
        );
    }

    private swapBaseToBaseOutput(pool: WOOFiPoolState, zeroToOne: boolean, base2Amount: bigint) {
        let [base1FeeRate, base2FeeRate] = zeroToOne ? [pool.feeRate0, pool.feeRate1] : [pool.feeRate1, pool.feeRate0];
        let [base1MaxGamma, base2MaxGamma] = zeroToOne ? [pool.maxGamma0, pool.maxGamma1] : [pool.maxGamma1, pool.maxGamma0];
        let [base1MaxNotionalSwap, base2MaxNotionalSwap] = zeroToOne ? [pool.maxNotionalSwap0, pool.maxNotionalSwap1] : [pool.maxNotionalSwap1, pool.maxNotionalSwap0];

        let [base1Price, base2Price] = zeroToOne ? [pool.price0, pool.price1] : [pool.price1, pool.price0];
        let [base1Spread, base2Spread] = zeroToOne ? [pool.spread0, pool.spread1] : [pool.spread1, pool.spread0];
        let [base1Coeff, base2Coeff] = zeroToOne ? [pool.coeff0, pool.coeff1] : [pool.coeff1, pool.coeff0];
        let [base1WoFeasible, base2WoFeasible] = zeroToOne ? [pool.woFeasible0, pool.woFeasible1] : [pool.woFeasible1, pool.woFeasible0];
        let [base1Decimals, base2Decimals] = zeroToOne ? [pool.decimals0, pool.decimals1] : [pool.decimals1, pool.decimals0];

        let feeRate = base1FeeRate >= base2FeeRate ? base1FeeRate : base2FeeRate;
        let spread = base1Spread >= base2Spread ? base1Spread : base2Spread;

        let quoteAmountAfterFee = this.calcBaseAmountSellQuoteOutput(
            base2Amount, base2MaxGamma, base2MaxNotionalSwap, base2Price, spread, base2Coeff, base2WoFeasible, base2Decimals
        );
        let quoteAmount = quoteAmountAfterFee / (this.BASE_FEE_RATE - feeRate) / this.BASE_FEE_RATE;

        let base1Amount = this.calcQuoteAmountSellBaseOutput(
            quoteAmount, base1MaxGamma, base1MaxNotionalSwap, base1Price, spread, base1Coeff, base1WoFeasible, base1Decimals
        );

        return base1Amount;
    }

    private calcBaseAmountSellQuoteOutput(
        baseAmount: bigint,
        baseMaxGamma: bigint,
        baseMaxNotionalSwap: bigint,
        basePrice: bigint,
        baseSpread: bigint,
        baseCoeff: bigint,
        baseWoFeasible: boolean,
        baseDecimals: bigint
    ): bigint {
        if (!baseWoFeasible) {
            throw new Error("WOOFiSwapLib: OracleInfeasible");
        }
        if (basePrice <= 0) {
            throw new Error("WOOFiSwapLib: OraclePriceHalted");
        }
        
        let baseUnit = 10n ** 18n;
        
        // delta = b ** 2 - 4ac
        let delta = (
            ((10n ** baseDecimals) * (10n ** ORACLE_PRICE_DECIMALS) * (10n ** QUOTE_TOKEN_DECIMALS) * (baseUnit - baseSpread)) ** 2n
            - 4n * ((10n ** baseDecimals) * (10n ** ORACLE_PRICE_DECIMALS) * baseCoeff * baseAmount * baseUnit * basePrice * ((10n ** QUOTE_TOKEN_DECIMALS) ** 2n))
        )
        console.log(`delta: ${delta}`);
        
        if (delta < 0n) {
            throw new Error("WOOFiSwapLib: DeltaLessThanZero");
        }
        
        let x1 = ((baseSpread - baseUnit) * (10n ** QUOTE_TOKEN_DECIMALS) + this.sqrt(delta)) / -2n * baseCoeff;
        let x2 = ((baseSpread - baseUnit) * (10n ** QUOTE_TOKEN_DECIMALS) - this.sqrt(delta)) / -2n * baseCoeff;
        let quoteAmountAfterFee = x1 >= x2 ? x1 : x2
        
        if (quoteAmountAfterFee < 0n) {
            throw new Error("WOOFiSwapLib: ResultLessThanZero");
        }

        if (quoteAmountAfterFee > baseMaxNotionalSwap) {
            throw new Error("WOOFiSwapLib: NotionalSwapExceeded");
        }

        let gamma = quoteAmountAfterFee * baseCoeff / (10n ** QUOTE_TOKEN_DECIMALS);
        if (gamma > baseMaxGamma) {
            throw new Error("WOOFiSwapLib: GammaExceeded");
        }

        return quoteAmountAfterFee;
    }

    private calcQuoteAmountSellBaseOutput(
        quoteAmount: bigint,
        baseMaxGamma: bigint,
        baseMaxNotionalSwap: bigint,
        basePrice: bigint,
        baseSpread: bigint,
        baseCoeff: bigint,
        baseWoFeasible: boolean,
        baseDecimals: bigint
    ): bigint {
        if (!baseWoFeasible) {
            throw new Error("WOOFiSwapLib: OracleInfeasible");
        }
        if (basePrice <= 0) {
            throw new Error("WOOFiSwapLib: OraclePriceHalted");
        }

        let baseUnit = 10n ** 18n;

        // delta = b ** 2 - 4ac
        let delta = ((basePrice * (10n ** QUOTE_TOKEN_DECIMALS) * (baseUnit - baseSpread) * (10n ** ORACLE_PRICE_DECIMALS) * (10n ** baseDecimals)) ** 2n)
            - (4n * (basePrice ** 2n) * (10n ** QUOTE_TOKEN_DECIMALS) * baseCoeff * quoteAmount * baseUnit * (10n ** baseDecimals) * (10n ** ORACLE_PRICE_DECIMALS));
        
        if (delta < 0n) {
            throw new Error("WOOFiSwapLib: DeltaLessThanZero");
        }
        
        let x1 = ((basePrice * (10n ** QUOTE_TOKEN_DECIMALS) * (baseUnit - baseSpread) * (10n ** ORACLE_PRICE_DECIMALS) * (10n ** baseDecimals)) + this.sqrt(delta)) / (2n * (basePrice ** 2n) * (10n ** QUOTE_TOKEN_DECIMALS) * baseCoeff);
        let x2 = ((basePrice * (10n ** QUOTE_TOKEN_DECIMALS) * (baseUnit - baseSpread) * (10n ** ORACLE_PRICE_DECIMALS) * (10n ** baseDecimals)) - this.sqrt(delta)) / (2n * (basePrice ** 2n) * (10n ** QUOTE_TOKEN_DECIMALS) * baseCoeff);
        let baseAmount = x1 >= x2 ? x1 : x2;
        
        if (baseAmount < 0n) {
            throw new Error("WOOFiSwapLib: ResultLessThanZero");
        }

        let notionalSwap = (baseAmount * basePrice * (10n ** QUOTE_TOKEN_DECIMALS)) / (10n ** baseDecimals) / (10n ** ORACLE_PRICE_DECIMALS);
        if (notionalSwap > baseMaxNotionalSwap) {
            throw new Error("WOOFiSwapLib: NotionalSwapExceeded");
        }

        let gamma = (baseAmount * basePrice * baseCoeff) / (10n ** ORACLE_PRICE_DECIMALS) / (10n ** baseDecimals);
        if (gamma > baseMaxGamma) {
            throw new Error("WOOFiSwapLib: GammaExceeded");
        }

        return baseAmount;
    }

    private sqrt(n: bigint): bigint {
        if (n < 0n) throw new Error("WOOFiSwapLib: NegativeNumbersIsNotSupported");
        if (n < 2n) return n;

        let low = 1n;
        let high = n;
        let mid: bigint;

        while (low <= high) {
            mid = (low + high) >> 1n;
            const midSquared = mid * mid;

            if (midSquared === n) {
                return mid;
            } else if (midSquared < n) {
                low = mid + 1n;
            } else {
                high = mid - 1n;
            }
        }

        return high;
    }

    override spotPriceWithoutFee(
        pool: WOOFiPoolState,
        zeroToOne: boolean,
    ): number {
        const [fromToken, toToken] = zeroToOne
            ? [pool.token0, pool.token1]
            : [pool.token1, pool.token0];
        
        const [fromDecimals, toDecimals] = zeroToOne
            ? [pool.decimals0, pool.decimals1]
            : [pool.decimals1, pool.decimals0];
        
        if (fromToken === QUOTE_TOKEN_ADDRESS) {
            // toToken is baseToken
            return Number(this.sellQuoteInput(pool, zeroToOne, (10n ** fromDecimals))) / Number((10n ** toDecimals));
        } else if (toToken === QUOTE_TOKEN_ADDRESS) {
            // fromToken is baseToken
            return Number(this.sellBaseInput(pool, zeroToOne, (10n ** fromDecimals))) / Number((10n ** toDecimals));
        } else {
            // fromToken and toToken both are baseToken
            return Number(this.swapBaseToBaseInput(pool, zeroToOne, (10n ** fromDecimals))) / Number((10n ** toDecimals));
        }
    }
}
