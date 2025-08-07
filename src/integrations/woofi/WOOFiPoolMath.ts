import { BasePoolMath } from "../../base/BasePoolMath";
import type { WOOFiPoolState } from "./WOOFiPoolState";
import {
	ORACLE_PRICE_DECIMALS,
	QUOTE_TOKEN_ADDRESS,
	QUOTE_TOKEN_DECIMALS,
} from "./constants";

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
		}
		if (toToken === QUOTE_TOKEN_ADDRESS) {
			// fromToken is baseToken
			return this.sellBaseInput(pool, zeroToOne, amountIn);
		}
		// fromToken and toToken both are baseToken
		return this.swapBaseToBaseInput(pool, zeroToOne, amountIn);
	}

	private sellQuoteInput(
		pool: WOOFiPoolState,
		zeroToOne: boolean,
		quoteAmount: bigint,
	): bigint {
		const baseFeeRate = zeroToOne ? pool.feeRate1 : pool.feeRate0;
		const baseMaxGamma = zeroToOne ? pool.maxGamma1 : pool.maxGamma0;
		const baseMaxNotionalSwap = zeroToOne
			? pool.maxNotionalSwap1
			: pool.maxNotionalSwap0;
		// let baseCapBal = zeroToOne ? pool.capBal1 : pool.capBal0;

		const basePrice = zeroToOne ? pool.price1 : pool.price0;
		const baseSpread = zeroToOne ? pool.spread1 : pool.spread0;
		const baseCoeff = zeroToOne ? pool.coeff1 : pool.coeff0;
		const baseWoFeasible = zeroToOne ? pool.woFeasible1 : pool.woFeasible0;
		const baseDecimals = zeroToOne ? pool.decimals1 : pool.decimals0;

		const swapFee = (quoteAmount * baseFeeRate) / this.BASE_FEE_RATE;
		const quoteAmountAfterFee = quoteAmount - swapFee;

		const baseAmount = this.calcBaseAmountSellQuoteInput(
			quoteAmountAfterFee,
			baseMaxGamma,
			baseMaxNotionalSwap,
			basePrice,
			baseSpread,
			baseCoeff,
			baseWoFeasible,
			baseDecimals,
		);

		const baseReserve = zeroToOne ? pool.reserve1 : pool.reserve0;
		if (baseAmount > baseReserve) {
			throw new Error("WOOFiSwapLib: InsufficientBaseReserve");
		}

		return baseAmount;
	}

	private sellBaseInput(
		pool: WOOFiPoolState,
		zeroToOne: boolean,
		baseAmount: bigint,
	): bigint {
		const baseFeeRate = zeroToOne ? pool.feeRate0 : pool.feeRate1;
		const baseMaxGamma = zeroToOne ? pool.maxGamma0 : pool.maxGamma1;
		const baseMaxNotionalSwap = zeroToOne
			? pool.maxNotionalSwap0
			: pool.maxNotionalSwap1;
		// let baseCapBal = zeroToOne ? pool.capBal0 : pool.capBal1;

		const basePrice = zeroToOne ? pool.price0 : pool.price1;
		const baseSpread = zeroToOne ? pool.spread0 : pool.spread1;
		const baseCoeff = zeroToOne ? pool.coeff0 : pool.coeff1;
		const baseWoFeasible = zeroToOne ? pool.woFeasible0 : pool.woFeasible1;
		const baseDecimals = zeroToOne ? pool.decimals0 : pool.decimals1;

		const quoteAmount = this.calcQuoteAmountSellBaseInput(
			baseAmount,
			baseMaxGamma,
			baseMaxNotionalSwap,
			basePrice,
			baseSpread,
			baseCoeff,
			baseWoFeasible,
			baseDecimals,
		);

		const quoteReserve = zeroToOne ? pool.reserve1 : pool.reserve0;
		if (quoteAmount > quoteReserve) {
			throw new Error("WOOFiSwapLib: InsufficientQuoteReserve");
		}

		const swapFee = (quoteAmount * baseFeeRate) / this.BASE_FEE_RATE;
		return quoteAmount - swapFee;
	}

	private swapBaseToBaseInput(
		pool: WOOFiPoolState,
		zeroToOne: boolean,
		base1Amount: bigint,
	): bigint {
		const [base1FeeRate, base2FeeRate] = zeroToOne
			? [pool.feeRate0, pool.feeRate1]
			: [pool.feeRate1, pool.feeRate0];
		const [base1MaxGamma, base2MaxGamma] = zeroToOne
			? [pool.maxGamma0, pool.maxGamma1]
			: [pool.maxGamma1, pool.maxGamma0];
		const [base1MaxNotionalSwap, base2MaxNotionalSwap] = zeroToOne
			? [pool.maxNotionalSwap0, pool.maxNotionalSwap1]
			: [pool.maxNotionalSwap1, pool.maxNotionalSwap0];

		const [base1Price, base2Price] = zeroToOne
			? [pool.price0, pool.price1]
			: [pool.price1, pool.price0];
		const [base1Spread, base2Spread] = zeroToOne
			? [pool.spread0, pool.spread1]
			: [pool.spread1, pool.spread0];
		const [base1Coeff, base2Coeff] = zeroToOne
			? [pool.coeff0, pool.coeff1]
			: [pool.coeff1, pool.coeff0];
		const [base1WoFeasible, base2WoFeasible] = zeroToOne
			? [pool.woFeasible0, pool.woFeasible1]
			: [pool.woFeasible1, pool.woFeasible0];
		const [base1Decimals, base2Decimals] = zeroToOne
			? [pool.decimals0, pool.decimals1]
			: [pool.decimals1, pool.decimals0];

		const feeRate = base1FeeRate >= base2FeeRate ? base1FeeRate : base2FeeRate;
		const spread = base1Spread >= base2Spread ? base1Spread : base2Spread;

		const quoteAmount = this.calcQuoteAmountSellBaseInput(
			base1Amount,
			base1MaxGamma,
			base1MaxNotionalSwap,
			base1Price,
			spread,
			base1Coeff,
			base1WoFeasible,
			base1Decimals,
		);

		const swapFee = (quoteAmount * feeRate) / this.BASE_FEE_RATE;
		if (swapFee > pool.quoteReserve) {
			throw new Error("WOOFiSwapLib: InsufficientQuoteReserveAsSwapFee");
		}

		const quoteAmountAfterFee = quoteAmount - swapFee;

		const base2Amount = this.calcBaseAmountSellQuoteInput(
			quoteAmountAfterFee,
			base2MaxGamma,
			base2MaxNotionalSwap,
			base2Price,
			spread,
			base2Coeff,
			base2WoFeasible,
			base2Decimals,
		);

		const base2Reserve = zeroToOne ? pool.reserve1 : pool.reserve0;
		if (base2Amount > base2Reserve) {
			throw new Error("WOOFiSwapLib: InsufficientBase2Reserve");
		}

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
		baseDecimals: bigint,
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

		const gamma =
			(quoteAmountAfterFee * baseCoeff) / 10n ** QUOTE_TOKEN_DECIMALS;
		if (gamma > baseMaxGamma) {
			throw new Error("WOOFiSwapLib: GammaExceeded");
		}

		const baseUnit = 10n ** 18n;

		const baseAmount =
			(((quoteAmountAfterFee *
				10n ** baseDecimals *
				10n ** ORACLE_PRICE_DECIMALS) /
				basePrice) *
				(baseUnit - gamma - baseSpread)) /
			baseUnit /
			10n ** QUOTE_TOKEN_DECIMALS;

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
		baseDecimals: bigint,
	): bigint {
		if (!baseWoFeasible) {
			throw new Error("WOOFiSwapLib: OracleInfeasible");
		}
		if (basePrice <= 0) {
			throw new Error("WOOFiSwapLib: OraclePriceHalted");
		}

		const notionalSwap =
			(baseAmount * basePrice * 10n ** QUOTE_TOKEN_DECIMALS) /
			10n ** baseDecimals /
			10n ** ORACLE_PRICE_DECIMALS;
		if (notionalSwap > baseMaxNotionalSwap) {
			throw new Error("WOOFiSwapLib: NotionalSwapExceeded");
		}

		const gamma =
			(baseAmount * basePrice * baseCoeff) /
			10n ** ORACLE_PRICE_DECIMALS /
			10n ** baseDecimals;
		if (gamma > baseMaxGamma) {
			throw new Error("WOOFiSwapLib: GammaExceeded");
		}

		const baseUnit = 10n ** 18n;

		const quoteAmount =
			(((baseAmount * basePrice * 10n ** QUOTE_TOKEN_DECIMALS) /
				10n ** ORACLE_PRICE_DECIMALS) *
				(baseUnit - gamma - baseSpread)) /
			baseUnit /
			10n ** baseDecimals;

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
		}
		if (toToken === QUOTE_TOKEN_ADDRESS) {
			// fromToken is baseToken
			return this.sellBaseOutput(pool, zeroToOne, amountOut);
		}
		// fromToken and toToken both are baseToken
		return this.swapBaseToBaseOutput(pool, zeroToOne, amountOut);
	}

	private sellQuoteOutput(
		pool: WOOFiPoolState,
		zeroToOne: boolean,
		baseAmount: bigint,
	) {
		const baseReserve = zeroToOne ? pool.reserve1 : pool.reserve0;
		if (baseAmount > baseReserve) {
			throw new Error("WOOFiSwapLib: InsufficientBaseReserve");
		}

		const baseFeeRate = zeroToOne ? pool.feeRate1 : pool.feeRate0;
		const baseMaxGamma = zeroToOne ? pool.maxGamma1 : pool.maxGamma0;
		const baseMaxNotionalSwap = zeroToOne
			? pool.maxNotionalSwap1
			: pool.maxNotionalSwap0;
		// let baseCapBal = zeroToOne ? pool.capBal1 : pool.capBal0;

		const basePrice = zeroToOne ? pool.price1 : pool.price0;
		const baseSpread = zeroToOne ? pool.spread1 : pool.spread0;
		const baseCoeff = zeroToOne ? pool.coeff1 : pool.coeff0;
		const baseWoFeasible = zeroToOne ? pool.woFeasible1 : pool.woFeasible0;
		const baseDecimals = zeroToOne ? pool.decimals1 : pool.decimals0;

		const quoteAmountAfterFee = this.calcBaseAmountSellQuoteOutput(
			baseAmount,
			baseMaxGamma,
			baseMaxNotionalSwap,
			basePrice,
			baseSpread,
			baseCoeff,
			baseWoFeasible,
			baseDecimals,
		);

		const quoteAmount =
			(quoteAmountAfterFee * this.BASE_FEE_RATE) /
			(this.BASE_FEE_RATE - baseFeeRate);

		return quoteAmount;
	}

	private sellBaseOutput(
		pool: WOOFiPoolState,
		zeroToOne: boolean,
		quoteAmountAfterFee: bigint,
	) {
		const baseFeeRate = zeroToOne ? pool.feeRate0 : pool.feeRate1;
		const baseMaxGamma = zeroToOne ? pool.maxGamma0 : pool.maxGamma1;
		const baseMaxNotionalSwap = zeroToOne
			? pool.maxNotionalSwap0
			: pool.maxNotionalSwap1;
		// let baseCapBal = zeroToOne ? pool.capBal0 : pool.capBal1;

		const basePrice = zeroToOne ? pool.price0 : pool.price1;
		const baseSpread = zeroToOne ? pool.spread0 : pool.spread1;
		const baseCoeff = zeroToOne ? pool.coeff0 : pool.coeff1;
		const baseWoFeasible = zeroToOne ? pool.woFeasible0 : pool.woFeasible1;
		const baseDecimals = zeroToOne ? pool.decimals0 : pool.decimals1;

		const quoteAmount =
			(quoteAmountAfterFee * this.BASE_FEE_RATE) /
			(this.BASE_FEE_RATE - baseFeeRate);

		const quoteReserve = zeroToOne ? pool.reserve1 : pool.reserve0;
		if (quoteAmount > quoteReserve) {
			throw new Error("WOOFiSwapLib: InsufficientQuoteReserve");
		}

		return this.calcQuoteAmountSellBaseOutput(
			quoteAmount,
			baseMaxGamma,
			baseMaxNotionalSwap,
			basePrice,
			baseSpread,
			baseCoeff,
			baseWoFeasible,
			baseDecimals,
		);
	}

	private swapBaseToBaseOutput(
		pool: WOOFiPoolState,
		zeroToOne: boolean,
		base2Amount: bigint,
	) {
		const base2Reserve = zeroToOne ? pool.reserve1 : pool.reserve0;
		if (base2Amount > base2Reserve) {
			throw new Error("WOOFiSwapLib: InsufficientBase2Reserve");
		}

		const [base1FeeRate, base2FeeRate] = zeroToOne
			? [pool.feeRate0, pool.feeRate1]
			: [pool.feeRate1, pool.feeRate0];
		const [base1MaxGamma, base2MaxGamma] = zeroToOne
			? [pool.maxGamma0, pool.maxGamma1]
			: [pool.maxGamma1, pool.maxGamma0];
		const [base1MaxNotionalSwap, base2MaxNotionalSwap] = zeroToOne
			? [pool.maxNotionalSwap0, pool.maxNotionalSwap1]
			: [pool.maxNotionalSwap1, pool.maxNotionalSwap0];

		const [base1Price, base2Price] = zeroToOne
			? [pool.price0, pool.price1]
			: [pool.price1, pool.price0];
		const [base1Spread, base2Spread] = zeroToOne
			? [pool.spread0, pool.spread1]
			: [pool.spread1, pool.spread0];
		const [base1Coeff, base2Coeff] = zeroToOne
			? [pool.coeff0, pool.coeff1]
			: [pool.coeff1, pool.coeff0];
		const [base1WoFeasible, base2WoFeasible] = zeroToOne
			? [pool.woFeasible0, pool.woFeasible1]
			: [pool.woFeasible1, pool.woFeasible0];
		const [base1Decimals, base2Decimals] = zeroToOne
			? [pool.decimals0, pool.decimals1]
			: [pool.decimals1, pool.decimals0];

		const feeRate = base1FeeRate >= base2FeeRate ? base1FeeRate : base2FeeRate;
		const spread = base1Spread >= base2Spread ? base1Spread : base2Spread;

		const quoteAmountAfterFee = this.calcBaseAmountSellQuoteOutput(
			base2Amount,
			base2MaxGamma,
			base2MaxNotionalSwap,
			base2Price,
			spread,
			base2Coeff,
			base2WoFeasible,
			base2Decimals,
		);
		const quoteAmount =
			(quoteAmountAfterFee * this.BASE_FEE_RATE) /
			(this.BASE_FEE_RATE - feeRate);
		const swapFee = quoteAmount - quoteAmountAfterFee;
		if (swapFee > pool.quoteReserve) {
			throw new Error("WOOFiSwapLib: InsufficientQuoteReserveAsSwapFee");
		}

		const base1Amount = this.calcQuoteAmountSellBaseOutput(
			quoteAmount,
			base1MaxGamma,
			base1MaxNotionalSwap,
			base1Price,
			spread,
			base1Coeff,
			base1WoFeasible,
			base1Decimals,
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
		baseDecimals: bigint,
	): bigint {
		if (!baseWoFeasible) {
			throw new Error("WOOFiSwapLib: OracleInfeasible");
		}
		if (basePrice <= 0) {
			throw new Error("WOOFiSwapLib: OraclePriceHalted");
		}

		const baseUnit = 10n ** 18n;
		const qd = 10n ** QUOTE_TOKEN_DECIMALS;
		const pd = 10n ** ORACLE_PRICE_DECIMALS;
		const bd = 10n ** baseDecimals;

		const scaler = 10n ** 36n;

		const a = (scaler * bd * pd * baseCoeff) / basePrice / baseUnit / qd ** 2n;
		const b =
			(scaler * bd * pd * (baseSpread - baseUnit)) / basePrice / qd / baseUnit;
		const c = scaler * baseAmount;

		const delta = b ** 2n - 4n * a * c;

		if (delta < 0n) {
			throw new Error("WOOFiSwapLib: DeltaLessThanZero");
		}

		const x1 = (-b + this.sqrt(delta)) / (2n * a);
		const x2 = (-b - this.sqrt(delta)) / (2n * a);

		const notionalValueWithQD = (basePrice * baseAmount * qd) / pd / bd;
		const quoteAmountAfterFee =
			this.abs(x1 - notionalValueWithQD) < this.abs(x2 - notionalValueWithQD)
				? x1
				: x2;

		if (quoteAmountAfterFee < 0n) {
			throw new Error("WOOFiSwapLib: ResultLessThanZero");
		}

		if (quoteAmountAfterFee > baseMaxNotionalSwap) {
			throw new Error("WOOFiSwapLib: NotionalSwapExceeded");
		}

		const gamma =
			(quoteAmountAfterFee * baseCoeff) / 10n ** QUOTE_TOKEN_DECIMALS;
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
		baseDecimals: bigint,
	): bigint {
		if (!baseWoFeasible) {
			throw new Error("WOOFiSwapLib: OracleInfeasible");
		}
		if (basePrice <= 0) {
			throw new Error("WOOFiSwapLib: OraclePriceHalted");
		}

		const baseUnit = 10n ** 18n;
		const qd = 10n ** QUOTE_TOKEN_DECIMALS;
		const pd = 10n ** ORACLE_PRICE_DECIMALS;
		const bd = 10n ** baseDecimals;

		const scaler = 10n ** 36n;

		const a = (scaler * basePrice ** 2n * qd * baseCoeff) / pd ** 2n / bd;
		const b = (scaler * basePrice * qd * (baseSpread - baseUnit)) / pd;
		const c = scaler * quoteAmount * baseUnit * bd;

		const delta = b ** 2n - 4n * a * c;

		if (delta < 0n) {
			throw new Error("WOOFiSwapLib: DeltaLessThanZero");
		}

		const x1 = (-b + this.sqrt(delta)) / (2n * a);
		const x2 = (-b - this.sqrt(delta)) / (2n * a);

		const notionalValueWithQD1 = (basePrice * x1 * qd) / pd / bd;
		const notionalValueWithQD2 = (basePrice * x2 * qd) / pd / bd;

		const baseAmount =
			this.abs(notionalValueWithQD1 - quoteAmount) <
			this.abs(notionalValueWithQD2 - quoteAmount)
				? x1
				: x2;

		if (baseAmount < 0n) {
			throw new Error("WOOFiSwapLib: ResultLessThanZero");
		}

		const notionalSwap =
			(baseAmount * basePrice * 10n ** QUOTE_TOKEN_DECIMALS) /
			10n ** baseDecimals /
			10n ** ORACLE_PRICE_DECIMALS;
		if (notionalSwap > baseMaxNotionalSwap) {
			throw new Error("WOOFiSwapLib: NotionalSwapExceeded");
		}

		const gamma =
			(baseAmount * basePrice * baseCoeff) /
			10n ** ORACLE_PRICE_DECIMALS /
			10n ** baseDecimals;
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
			}
			if (midSquared < n) {
				low = mid + 1n;
			} else {
				high = mid - 1n;
			}
		}

		return high;
	}

	private abs(x: bigint): bigint {
		return x < 0n ? -x : x;
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
			return (
				Number(this.sellQuoteInput(pool, zeroToOne, 10n ** fromDecimals)) /
				Number(10n ** toDecimals)
			);
		}
		if (toToken === QUOTE_TOKEN_ADDRESS) {
			// fromToken is baseToken
			return (
				Number(this.sellBaseInput(pool, zeroToOne, 10n ** fromDecimals)) /
				Number(10n ** toDecimals)
			);
		}
		// fromToken and toToken both are baseToken
		return (
			Number(this.swapBaseToBaseInput(pool, zeroToOne, 10n ** fromDecimals)) /
			Number(10n ** toDecimals)
		);
	}
}
