export const OracleABI = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor"
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
        stateMutability: "nonpayable",
        type: "fallback"
    },
    {
        inputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8"
            }
        ],
        name: "basesMap",
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
        name: "bound",
        outputs: [
            {
                internalType: "uint64",
                name: "",
                type: "uint64"
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
        name: "clOracles",
        outputs: [
            {
                internalType: "address",
                name: "oracle",
                type: "address"
            },
            {
                internalType: "uint8",
                name: "decimal",
                type: "uint8"
            },
            {
                internalType: "bool",
                name: "cloPreferred",
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
                name: "_base",
                type: "address"
            }
        ],
        name: "cloPrice",
        outputs: [
            {
                internalType: "uint256",
                name: "refPrice",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "refTimestamp",
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
        name: "decimals",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8"
            }
        ],
        stateMutability: "pure",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint8",
                name: "_id",
                type: "uint8"
            }
        ],
        name: "getBase",
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
                name: "",
                type: "address"
            }
        ],
        name: "infos",
        outputs: [
            {
                internalType: "uint128",
                name: "price",
                type: "uint128"
            },
            {
                internalType: "uint64",
                name: "coeff",
                type: "uint64"
            },
            {
                internalType: "uint64",
                name: "spread",
                type: "uint64"
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
        name: "isAdmin",
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
                name: "",
                type: "address"
            }
        ],
        name: "isGuardian",
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
                name: "_base",
                type: "address"
            }
        ],
        name: "isWoFeasible",
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
        inputs: [
            {
                internalType: "address",
                name: "_base",
                type: "address"
            },
            {
                internalType: "uint128",
                name: "_price",
                type: "uint128"
            },
            {
                internalType: "uint256",
                name: "_ts",
                type: "uint256"
            }
        ],
        name: "postPrice",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_base",
                type: "address"
            },
            {
                internalType: "uint128",
                name: "_price",
                type: "uint128"
            }
        ],
        name: "postPrice",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address[]",
                name: "_bases",
                type: "address[]"
            },
            {
                internalType: "uint128[]",
                name: "_prices",
                type: "uint128[]"
            },
            {
                internalType: "uint256",
                name: "_ts",
                type: "uint256"
            }
        ],
        name: "postPriceList",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_base",
                type: "address"
            },
            {
                internalType: "uint128",
                name: "_price",
                type: "uint128"
            },
            {
                internalType: "uint64",
                name: "_spread",
                type: "uint64"
            },
            {
                internalType: "uint64",
                name: "_coeff",
                type: "uint64"
            },
            {
                internalType: "uint256",
                name: "_ts",
                type: "uint256"
            }
        ],
        name: "postState",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_base",
                type: "address"
            },
            {
                internalType: "uint128",
                name: "_price",
                type: "uint128"
            },
            {
                internalType: "uint64",
                name: "_spread",
                type: "uint64"
            },
            {
                internalType: "uint64",
                name: "_coeff",
                type: "uint64"
            }
        ],
        name: "postState",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address[]",
                name: "_bases",
                type: "address[]"
            },
            {
                internalType: "uint128[]",
                name: "_prices",
                type: "uint128[]"
            },
            {
                internalType: "uint64[]",
                name: "_spreads",
                type: "uint64[]"
            },
            {
                internalType: "uint64[]",
                name: "_coeffs",
                type: "uint64[]"
            },
            {
                internalType: "uint256",
                name: "_ts",
                type: "uint256"
            }
        ],
        name: "postStateList",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_base",
                type: "address"
            }
        ],
        name: "price",
        outputs: [
            {
                internalType: "uint256",
                name: "priceOut",
                type: "uint256"
            },
            {
                internalType: "bool",
                name: "feasible",
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
                name: "",
                type: "address"
            }
        ],
        name: "priceRanges",
        outputs: [
            {
                internalType: "uint128",
                name: "min",
                type: "uint128"
            },
            {
                internalType: "uint128",
                name: "max",
                type: "uint128"
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
                name: "_addr",
                type: "address"
            },
            {
                internalType: "bool",
                name: "_flag",
                type: "bool"
            }
        ],
        name: "setAdmin",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint8",
                name: "_id",
                type: "uint8"
            },
            {
                internalType: "address",
                name: "_base",
                type: "address"
            }
        ],
        name: "setBase",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint64",
                name: "_bound",
                type: "uint64"
            }
        ],
        name: "setBound",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_token",
                type: "address"
            },
            {
                internalType: "address",
                name: "_oracle",
                type: "address"
            },
            {
                internalType: "bool",
                name: "_cloPreferred",
                type: "bool"
            }
        ],
        name: "setCLOracle",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_token",
                type: "address"
            },
            {
                internalType: "bool",
                name: "_cloPreferred",
                type: "bool"
            }
        ],
        name: "setCloPreferred",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_addr",
                type: "address"
            },
            {
                internalType: "bool",
                name: "_flag",
                type: "bool"
            }
        ],
        name: "setGuardian",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_quote",
                type: "address"
            },
            {
                internalType: "address",
                name: "_oracle",
                type: "address"
            }
        ],
        name: "setQuoteToken",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_base",
                type: "address"
            },
            {
                internalType: "uint128",
                name: "_min",
                type: "uint128"
            },
            {
                internalType: "uint128",
                name: "_max",
                type: "uint128"
            }
        ],
        name: "setRange",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_staleDuration",
                type: "uint256"
            }
        ],
        name: "setStaleDuration",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_wooPP",
                type: "address"
            }
        ],
        name: "setWooPP",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "staleDuration",
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
                name: "_base",
                type: "address"
            }
        ],
        name: "state",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint128",
                        name: "price",
                        type: "uint128"
                    },
                    {
                        internalType: "uint64",
                        name: "spread",
                        type: "uint64"
                    },
                    {
                        internalType: "uint64",
                        name: "coeff",
                        type: "uint64"
                    },
                    {
                        internalType: "bool",
                        name: "woFeasible",
                        type: "bool"
                    }
                ],
                internalType: "struct IWooracleV2_2.State",
                name: "",
                type: "tuple"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "timestamp",
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
                name: "_base",
                type: "address"
            }
        ],
        name: "woState",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint128",
                        name: "price",
                        type: "uint128"
                    },
                    {
                        internalType: "uint64",
                        name: "spread",
                        type: "uint64"
                    },
                    {
                        internalType: "uint64",
                        name: "coeff",
                        type: "uint64"
                    },
                    {
                        internalType: "bool",
                        name: "woFeasible",
                        type: "bool"
                    }
                ],
                internalType: "struct IWooracleV2_2.State",
                name: "",
                type: "tuple"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "wooPP",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    }
] as const;
