import {
    type Address,
    type WatchContractEventOnLogsParameter,
    zeroAddress,
} from "viem";
import { BasePoolStateProvider } from "../../base/BasePoolProvider";
import type { WOOFiPoolState } from "./WOOFiPoolState";
import { ERC20ABI } from "./abis/ERC20";
import { IntegrationHelperABI } from "./abis/IntegrationHelper";
import { OracleABI } from "./abis/Oracle";
import { PoolABI } from "./abis/Pool";
import { RouterABI } from "./abis/Router";
import {
    ROUTER_ADDRESS,
    POOL_ADDRESS,
    ORACLE_ADDRESS,
    INTEGRATION_HELPER_ADDRESS,
    QUOTE_TOKEN_ADDRESS,
    USER_ADDRESS_PLACEHOLDER,
} from "./constants";

interface TokenInfo {
    reserve: bigint;
    feeRate: bigint;
    maxGamma: bigint;
    maxNotionalSwap: bigint;
    capBal: bigint;
}

interface State {
    price: bigint;
    spread: bigint;
    coeff: bigint;
    woFeasible: boolean;
}

export class WOOFiPoolProvider extends BasePoolStateProvider<WOOFiPoolState> {
    readonly abi = [...PoolABI];

    async getAllPools(): Promise<WOOFiPoolState[]> {
        const [quoteToken, baseTokens] = await this.client.readContract({
            address: INTEGRATION_HELPER_ADDRESS,
            abi: IntegrationHelperABI,
            functionName: "getSupportTokens",
            args: [],
        });
        const tokens = [...baseTokens, quoteToken];
        const tokenInfos = await this.getTokenInfos(tokens);
        const states = await this.getStates(tokens);
        const decimals = await this.getDecimals(tokens);

        const pools: WOOFiPoolState[] = [];
        for (let i = 0; i < tokens.length; i++) {
            for (let j = i + 1; j < tokens.length; j++) {
                pools.push({
                    token0: tokens[i] ?? zeroAddress,
                    token1: tokens[j] ?? zeroAddress,
                    address: POOL_ADDRESS,
                    reserve0: tokenInfos[i]?.reserve ?? 0n,
                    reserve1: tokenInfos[j]?.reserve ?? 0n,
                    feeRate0: tokenInfos[i]?.feeRate ?? 0n,
                    feeRate1: tokenInfos[j]?.feeRate ?? 0n,
                    maxGamma0: tokenInfos[i]?.maxGamma ?? 0n,
                    maxGamma1: tokenInfos[j]?.maxGamma ?? 0n,
                    maxNotionalSwap0: tokenInfos[i]?.maxNotionalSwap ?? 0n,
                    maxNotionalSwap1: tokenInfos[j]?.maxNotionalSwap ?? 0n,
                    capBal0: tokenInfos[i]?.capBal ?? 0n,
                    capBal1: tokenInfos[j]?.capBal ?? 0n,
                    price0: states[i]?.price ?? 0n,
                    price1: states[j]?.price ?? 0n,
                    spread0: states[i]?.spread ?? 0n,
                    spread1: states[j]?.spread ?? 0n,
                    coeff0: states[i]?.coeff ?? 0n,
                    coeff1: states[j]?.coeff ?? 0n,
                    woFeasible0: states[i]?.woFeasible ?? false,
                    woFeasible1: states[j]?.woFeasible ?? false,
                    decimals0: decimals[i] ?? 0n,
                    decimals1: decimals[j] ?? 0n,
                });
            }
        }

        return pools;
    }

    async getTokenInfos(tokens: Address[]): Promise<TokenInfo[]> {
        const contracts = tokens.map(token => ({
            address: POOL_ADDRESS,
            abi: PoolABI,
            functionName: "tokenInfos",
            args: [token],
        }));
        const tokenInfos = await this.client.multicall({contracts: contracts});

        return tokenInfos.map(tokenInfo => ({
            reserve: (tokenInfo as { result : bigint[] | undefined}).result?.[0],
            feeRate: (tokenInfo as { result : bigint[] | undefined}).result?.[1],
            maxGamma: (tokenInfo as { result : bigint[] | undefined}).result?.[2],
            maxNotionalSwap: (tokenInfo as { result : bigint[] | undefined}).result?.[3],
            capBal: (tokenInfo as { result : bigint[] | undefined}).result?.[4],
        })) as TokenInfo[];
    }

    async getStates(tokens: Address[]): Promise<State[]> {
        const contracts = tokens.map(token => ({
            address: ORACLE_ADDRESS,
            abi: OracleABI,
            functionName: "state",
            args: [token],
        }));
        const states = await this.client.multicall({contracts: contracts});

        return states.map(state => ({
            price: (state as { result : bigint[] | undefined}).result?.[0],
            spread: (state as { result : bigint[] | undefined}).result?.[1],
            coeff: (state as { result : bigint[] | undefined}).result?.[2],
            woFeasible: (state as { result : boolean[] | undefined}).result?.[3],
        })) as State[];
    }

    async getDecimals(tokens: Address[]): Promise<bigint[]> {
        const contracts = tokens.map(token => ({
            address: token,
            abi: ERC20ABI,
            functionName: "decimals",
            args: [],
        }));
        const decimals = await this.client.multicall({contracts: contracts});

        return decimals.map(decimal => (decimal as { result : bigint | undefined}).result ?? 0n);
    }

    async swap(
        pool: WOOFiPoolState,
        amountIn: bigint,
		zeroToOne: boolean,
    ): Promise<void> {
        const [fromToken, toToken] = zeroToOne ? [pool.token0, pool.token1] : [pool.token1, pool.token0];

        const minToAmount = 0n;
        const to = USER_ADDRESS_PLACEHOLDER;
        const rebateTo = USER_ADDRESS_PLACEHOLDER;

        await this.client.simulateContract({
            address: ROUTER_ADDRESS,
            abi: RouterABI,
            functionName: "swap",
            args: [fromToken, toToken, amountIn, minToAmount, to, rebateTo],
            value: 0n,
        });
    }

    async handleEvent(
        log: WatchContractEventOnLogsParameter<typeof this.abi>[number],
    ): Promise<void> {
        if (!log.address) {
			return;
		}

        switch (log.eventName) {
            case "WooSwap": {
                const args = log.args as {
                    fromToken: Address;
                    toToken: Address;
                    fromAmount: bigint;
                    toAmount: bigint;
                    from: Address;
                    to: Address;
                    rebateTo: Address;
                    swapVol: bigint;
                    swapFee: bigint;
                };
                const poolState = this.pools.get(log.address);
				if (!poolState) return;
                if (args.fromToken === QUOTE_TOKEN_ADDRESS) {
                    if (args.fromToken === poolState.token0) {
                        poolState.reserve0 = poolState.reserve0 + args.fromAmount - args.swapFee;
                    } else if (args.fromToken === poolState.token1) {
                        poolState.reserve1 = poolState.reserve1 + args.fromAmount - args.swapFee;
                    }

                    if (args.toToken === poolState.token0) {
                        poolState.reserve0 = poolState.reserve0 - args.toAmount;
                    } else if (args.toToken === poolState.token1) {
                        poolState.reserve1 = poolState.reserve1 - args.toAmount;
                    }
                } else if (args.toToken === QUOTE_TOKEN_ADDRESS) {
                    if (args.fromToken === poolState.token0) {
                        poolState.reserve0 = poolState.reserve0 + args.fromAmount;
                    } else if (args.fromToken === poolState.token1) {
                        poolState.reserve1 = poolState.reserve1 + args.fromAmount;
                    }

                    if (args.toToken === poolState.token0) {
                        poolState.reserve0 = poolState.reserve0 - args.toAmount - args.swapFee;
                    } else if (args.toToken === poolState.token1) {
                        poolState.reserve1 = poolState.reserve1 - args.toAmount - args.swapFee;
                    }
                } else {
                    if (args.fromToken === poolState.token0) {
                        poolState.reserve0 = poolState.reserve0 + args.fromAmount;
                    } else if (args.fromToken === poolState.token1) {
                        poolState.reserve1 = poolState.reserve1 + args.fromAmount;
                    }

                    if (args.toToken === poolState.token0) {
                        poolState.reserve0 = poolState.reserve0 - args.toAmount;
                    } else if (args.toToken === poolState.token1) {
                        poolState.reserve1 = poolState.reserve1 - args.toAmount;
                    }
                }
				this.pools.set(log.address, poolState);
				return;
            }
        }
    }
}
