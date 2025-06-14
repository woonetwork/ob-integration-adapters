
export const PoolABI = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor"
    },
    {
        inputs: [],
        name: "EnforcedPause",
        type: "error"
    },
    {
        inputs: [],
        name: "ExpectedPause",
        type: "error"
    },
    {
        inputs: [],
        name: "InvalidInitialization",
        type: "error"
    },
    {
        inputs: [],
        name: "NotInitializing",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address"
            }
        ],
        name: "OwnableInvalidOwner",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address"
            }
        ],
        name: "OwnableUnauthorizedAccount",
        type: "error"
    },
    {
        inputs: [],
        name: "ReentrancyGuardReentrantCall",
        type: "error"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "token",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256"
            }
        ],
        name: "Deposit",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "newFeeAddr",
                type: "address"
            }
        ],
        name: "FeeAddrUpdated",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint64",
                name: "version",
                type: "uint64"
            }
        ],
        name: "Initialized",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "token",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "receiver",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256"
            }
        ],
        name: "Migrate",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address"
            }
        ],
        name: "OwnershipTransferred",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address"
            }
        ],
        name: "Paused",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address"
            }
        ],
        name: "Unpaused",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "user",
                type: "address"
            },
            {
                indexed: false,
                internalType: "bool",
                name: "flagAdmin",
                type: "bool"
            },
            {
                indexed: false,
                internalType: "bool",
                name: "flagGasSetter",
                type: "bool"
            },
            {
                indexed: false,
                internalType: "bool",
                name: "flagPauser",
                type: "bool"
            }
        ],
        name: "UserPermissionUpdated",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "token",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "receiver",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256"
            }
        ],
        name: "Withdraw",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "fromToken",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "toToken",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "fromAmount",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "toAmount",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "address",
                name: "from",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                indexed: false,
                internalType: "address",
                name: "rebateTo",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "swapVol",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "swapFee",
                type: "uint256"
            }
        ],
        name: "WooSwap",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "newWooracle",
                type: "address"
            }
        ],
        name: "WooracleUpdated",
        type: "event"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "token",
                type: "address"
            }
        ],
        name: "balance",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        name: "blacklist",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "claimFee",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "baseToken",
                type: "address"
            }
        ],
        name: "decimalInfo",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint64",
                        name: "priceDec",
                        type: "uint64"
                    },
                    {
                        internalType: "uint64",
                        name: "quoteDec",
                        type: "uint64"
                    },
                    {
                        internalType: "uint64",
                        name: "baseDec",
                        type: "uint64"
                    }
                ],
                internalType: "struct WooPPV2.DecimalInfo",
                name: "",
                type: "tuple"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "token",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
            }
        ],
        name: "deposit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "feeAddr",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "stuckToken",
                type: "address"
            }
        ],
        name: "inCaseTokenGotStuck",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_owner",
                type: "address"
            },
            {
                internalType: "address",
                name: "_quoteToken",
                type: "address"
            },
            {
                internalType: "address",
                name: "_wooracle",
                type: "address"
            },
            {
                internalType: "address",
                name: "_feeAddr",
                type: "address"
            }
        ],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        name: "lendManagers",
        outputs: [
            {
                internalType: "contract IWooLendingManager",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "maxGasPrice",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "token",
                type: "address"
            },
            {
                internalType: "address",
                name: "newPool",
                type: "address"
            }
        ],
        name: "migrateToNewPool",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "pause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "paused",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "token",
                type: "address"
            }
        ],
        name: "poolSize",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "fromToken",
                type: "address"
            },
            {
                internalType: "address",
                name: "toToken",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "fromAmount",
                type: "uint256"
            }
        ],
        name: "query",
        outputs: [
            {
                internalType: "uint256",
                name: "toAmount",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "quoteToken",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "repaidToken",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
            }
        ],
        name: "repayLegacy",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "repaidToken",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "principalAmount",
                type: "uint256"
            }
        ],
        name: "repayPrincipal",
        outputs: [
            {
                internalType: "uint256",
                name: "repaidAmount",
                type: "uint256"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "wantToken",
                type: "address"
            }
        ],
        name: "repayWeeklyLending",
        outputs: [
            {
                internalType: "uint256",
                name: "repaidAmount",
                type: "uint256"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "user",
                type: "address"
            },
            {
                internalType: "bool",
                name: "flag",
                type: "bool"
            }
        ],
        name: "setBlacklist",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "token",
                type: "address"
            },
            {
                internalType: "uint192",
                name: "capBal",
                type: "uint192"
            }
        ],
        name: "setCapBal",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_feeAddr",
                type: "address"
            }
        ],
        name: "setFeeAddr",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "token",
                type: "address"
            },
            {
                internalType: "uint16",
                name: "rate",
                type: "uint16"
            }
        ],
        name: "setFeeRate",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "contract IWooLendingManager",
                name: "_lendManager",
                type: "address"
            }
        ],
        name: "setLendManager",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "token",
                type: "address"
            },
            {
                internalType: "uint128",
                name: "maxGamma",
                type: "uint128"
            }
        ],
        name: "setMaxGamma",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_maxGasPrice",
                type: "uint256"
            }
        ],
        name: "setMaxGasPrice",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "token",
                type: "address"
            },
            {
                internalType: "uint128",
                name: "maxNotionalSwap",
                type: "uint128"
            }
        ],
        name: "setMaxNotionalSwap",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "token",
                type: "address"
            },
            {
                internalType: "uint16",
                name: "_feeRate",
                type: "uint16"
            },
            {
                internalType: "uint128",
                name: "_maxGamma",
                type: "uint128"
            },
            {
                internalType: "uint128",
                name: "_maxNotionalSwap",
                type: "uint128"
            },
            {
                internalType: "uint192",
                name: "_capBal",
                type: "uint192"
            }
        ],
        name: "setTokenInfo",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "user",
                type: "address"
            },
            {
                internalType: "bool",
                name: "flagAdmin",
                type: "bool"
            },
            {
                internalType: "bool",
                name: "flagGasSetter",
                type: "bool"
            },
            {
                internalType: "bool",
                name: "flagPauser",
                type: "bool"
            }
        ],
        name: "setUserPermission",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_wooracle",
                type: "address"
            }
        ],
        name: "setWooracle",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "fromToken",
                type: "address"
            },
            {
                internalType: "address",
                name: "toToken",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "fromAmount",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "minToAmount",
                type: "uint256"
            },
            {
                internalType: "address",
                name: "to",
                type: "address"
            },
            {
                internalType: "address",
                name: "rebateTo",
                type: "address"
            }
        ],
        name: "swap",
        outputs: [
            {
                internalType: "uint256",
                name: "realToAmount",
                type: "uint256"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        name: "tokenInfos",
        outputs: [
            {
                internalType: "uint192",
                name: "reserve",
                type: "uint192"
            },
            {
                internalType: "uint16",
                name: "feeRate",
                type: "uint16"
            },
            {
                internalType: "uint128",
                name: "maxGamma",
                type: "uint128"
            },
            {
                internalType: "uint128",
                name: "maxNotionalSwap",
                type: "uint128"
            },
            {
                internalType: "uint192",
                name: "capBal",
                type: "uint192"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address"
            }
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "fromToken",
                type: "address"
            },
            {
                internalType: "address",
                name: "toToken",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "fromAmount",
                type: "uint256"
            }
        ],
        name: "tryQuery",
        outputs: [
            {
                internalType: "uint256",
                name: "toAmount",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "unclaimedFee",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "unpause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        name: "userPermissions",
        outputs: [
            {
                internalType: "bool",
                name: "isAdmin",
                type: "bool"
            },
            {
                internalType: "bool",
                name: "isGasSetter",
                type: "bool"
            },
            {
                internalType: "bool",
                name: "isPauser",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "token",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
            }
        ],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "wooracle",
        outputs: [
            {
                internalType: "contract IWooracleV2_2",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    }
] as const;
