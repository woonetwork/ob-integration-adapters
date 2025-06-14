export const RouterABI = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_weth",
                type: "address"
            },
            {
                internalType: "address",
                name: "_pool",
                type: "address"
            }
        ],
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
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "newPool",
                type: "address"
            }
        ],
        name: "WooPoolChanged",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "enum IWooRouterV2.SwapType",
                name: "swapType",
                type: "uint8"
            },
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
            }
        ],
        name: "WooRouterSwap",
        type: "event"
    },
    {
        inputs: [],
        name: "WETH",
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
                name: "approveTarget",
                type: "address"
            },
            {
                internalType: "address",
                name: "swapTarget",
                type: "address"
            },
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
                internalType: "address payable",
                name: "to",
                type: "address"
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes"
            }
        ],
        name: "externalSwap",
        outputs: [
            {
                internalType: "uint256",
                name: "realToAmount",
                type: "uint256"
            }
        ],
        stateMutability: "payable",
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
                internalType: "address[]",
                name: "stuckTokens",
                type: "address[]"
            }
        ],
        name: "inCaseTokensGotStuck",
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
        name: "isWhitelisted",
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
        name: "querySwap",
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
                name: "newPool",
                type: "address"
            }
        ],
        name: "setPool",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "target",
                type: "address"
            },
            {
                internalType: "bool",
                name: "whitelisted",
                type: "bool"
            }
        ],
        name: "setWhitelisted",
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
                internalType: "address payable",
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
        stateMutability: "payable",
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
        name: "tryQuerySwap",
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
        name: "wooPool",
        outputs: [
            {
                internalType: "contract IWooPPV2",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        stateMutability: "payable",
        type: "receive"
    }
] as const;
