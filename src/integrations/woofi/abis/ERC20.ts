export const ERC20ABI = [
    {
        type: "constructor",
        stateMutability: "nonpayable",
        inputs: []
    },
    {
        type: "event",
        name: "AddSupportedChainId",
        inputs: [
            {
                type: "uint256",
                name: "chainId",
                internalType: "uint256",
                indexed: false
            }
        ],
        anonymous: false
    },
    {
        type: "event",
        name: "AddSwapToken",
        inputs: [
            {
                type: "address",
                name: "contractAddress",
                internalType: "address",
                indexed: false
            },
            {
                type: "uint256",
                name: "supplyIncrement",
                internalType: "uint256",
                indexed: false
            }
        ],
        anonymous: false
    },
    {
        type: "event",
        name: "Approval",
        inputs: [
            {
                type: "address",
                name: "owner",
                internalType: "address",
                indexed: true
            },
            {
                type: "address",
                name: "spender",
                internalType: "address",
                indexed: true
            },
            {
                type: "uint256",
                name: "value",
                internalType: "uint256",
                indexed: false
            }
        ],
        anonymous: false
    },
    {
        type: "event",
        name: "MigrateBridgeRole",
        inputs: [
            {
                type: "address",
                name: "newBridgeRoleAddress",
                internalType: "address",
                indexed: false
            }
        ],
        anonymous: false
    },
    {
        type: "event",
        name: "Mint",
        inputs: [
            {
                type: "address",
                name: "to",
                internalType: "address",
                indexed: false
            },
            {
                type: "uint256",
                name: "amount",
                internalType: "uint256",
                indexed: false
            },
            {
                type: "address",
                name: "feeAddress",
                internalType: "address",
                indexed: false
            },
            {
                type: "uint256",
                name: "feeAmount",
                internalType: "uint256",
                indexed: false
            },
            {
                type: "bytes32",
                name: "originTxId",
                internalType: "bytes32",
                indexed: false
            }
        ],
        anonymous: false
    },
    {
        type: "event",
        name: "RemoveSwapToken",
        inputs: [
            {
                type: "address",
                name: "contractAddress",
                internalType: "address",
                indexed: false
            },
            {
                type: "uint256",
                name: "supplyDecrement",
                internalType: "uint256",
                indexed: false
            }
        ],
        anonymous: false
    },
    {
        type: "event",
        name: "Swap",
        inputs: [
            {
                type: "address",
                name: "token",
                internalType: "address",
                indexed: false
            },
            {
                type: "uint256",
                name: "amount",
                internalType: "uint256",
                indexed: false
            }
        ],
        anonymous: false
    },
    {
        type: "event",
        name: "Transfer",
        inputs: [
            {
                type: "address",
                name: "from",
                internalType: "address",
                indexed: true
            },
            {
                type: "address",
                name: "to",
                internalType: "address",
                indexed: true
            },
            {
                type: "uint256",
                name: "value",
                internalType: "uint256",
                indexed: false
            }
        ],
        anonymous: false
    },
    {
        type: "event",
        name: "Unwrap",
        inputs: [
            {
                type: "uint256",
                name: "amount",
                internalType: "uint256",
                indexed: false
            },
            {
                type: "uint256",
                name: "chainId",
                internalType: "uint256",
                indexed: false
            }
        ],
        anonymous: false
    },
    {
        type: "function",
        stateMutability: "nonpayable",
        outputs: [],
        name: "addSupportedChainId",
        inputs: [
            {
                type: "uint256",
                name: "chainId",
                internalType: "uint256"
            }
        ]
    },
    {
        type: "function",
        stateMutability: "nonpayable",
        outputs: [],
        name: "addSwapToken",
        inputs: [
            {
                type: "address",
                name: "contractAddress",
                internalType: "address"
            },
            {
                type: "uint256",
                name: "supplyIncrement",
                internalType: "uint256"
            }
        ]
    },
    {
        type: "function",
        stateMutability: "view",
        outputs: [
            {
                type: "uint256",
                name: "",
                internalType: "uint256"
            }
        ],
        name: "allowance",
        inputs: [
            {
                type: "address",
                name: "owner",
                internalType: "address"
            },
            {
                type: "address",
                name: "spender",
                internalType: "address"
            }
        ]
    },
    {
        type: "function",
        stateMutability: "nonpayable",
        outputs: [
            {
                type: "bool",
                name: "",
                internalType: "bool"
            }
        ],
        name: "approve",
        inputs: [
            {
                type: "address",
                name: "spender",
                internalType: "address"
            },
            {
                type: "uint256",
                name: "amount",
                internalType: "uint256"
            }
        ]
    },
    {
        type: "function",
        stateMutability: "view",
        outputs: [
            {
                type: "uint256",
                name: "",
                internalType: "uint256"
            }
        ],
        name: "balanceOf",
        inputs: [
            {
                type: "address",
                name: "account",
                internalType: "address"
            }
        ]
    },
    {
        type: "function",
        stateMutability: "nonpayable",
        outputs: [],
        name: "burn",
        inputs: [
            {
                type: "uint256",
                name: "amount",
                internalType: "uint256"
            }
        ]
    },
    {
        type: "function",
        stateMutability: "nonpayable",
        outputs: [],
        name: "burnFrom",
        inputs: [
            {
                type: "address",
                name: "account",
                internalType: "address"
            },
            {
                type: "uint256",
                name: "amount",
                internalType: "uint256"
            }
        ]
    },
    {
        type: "function",
        stateMutability: "view",
        outputs: [
            {
                type: "bool",
                name: "",
                internalType: "bool"
            }
        ],
        name: "chainIds",
        inputs: [
            {
                type: "uint256",
                name: "",
                internalType: "uint256"
            }
        ]
    },
    {
        type: "function",
        stateMutability: "view",
        outputs: [
            {
                type: "uint8",
                name: "",
                internalType: "uint8"
            }
        ],
        name: "decimals",
        inputs: []
    },
    {
        type: "function",
        stateMutability: "nonpayable",
        outputs: [
            {
                type: "bool",
                name: "",
                internalType: "bool"
            }
        ],
        name: "decreaseAllowance",
        inputs: [
            {
                type: "address",
                name: "spender",
                internalType: "address"
            },
            {
                type: "uint256",
                name: "subtractedValue",
                internalType: "uint256"
            }
        ]
    },
    {
        type: "function",
        stateMutability: "nonpayable",
        outputs: [
            {
                type: "bool",
                name: "",
                internalType: "bool"
            }
        ],
        name: "increaseAllowance",
        inputs: [
            {
                type: "address",
                name: "spender",
                internalType: "address"
            },
            {
                type: "uint256",
                name: "addedValue",
                internalType: "uint256"
            }
        ]
    },
    {
        type: "function",
        stateMutability: "nonpayable",
        outputs: [],
        name: "migrateBridgeRole",
        inputs: [
            {
                type: "address",
                name: "newBridgeRoleAddress",
                internalType: "address"
            }
        ]
    },
    {
        type: "function",
        stateMutability: "nonpayable",
        outputs: [],
        name: "mint",
        inputs: [
            {
                type: "address",
                name: "to",
                internalType: "address"
            },
            {
                type: "uint256",
                name: "amount",
                internalType: "uint256"
            },
            {
                type: "address",
                name: "feeAddress",
                internalType: "address"
            },
            {
                type: "uint256",
                name: "feeAmount",
                internalType: "uint256"
            },
            {
                type: "bytes32",
                name: "originTxId",
                internalType: "bytes32"
            }
        ]
    },
    {
        type: "function",
        stateMutability: "view",
        outputs: [
            {
                type: "string",
                name: "",
                internalType: "string"
            }
        ],
        name: "name",
        inputs: []
    },
    {
        type: "function",
        stateMutability: "nonpayable",
        outputs: [],
        name: "removeSwapToken",
        inputs: [
            {
                type: "address",
                name: "contractAddress",
                internalType: "address"
            },
            {
                type: "uint256",
                name: "supplyDecrement",
                internalType: "uint256"
            }
        ]
    },
    {
        type: "function",
        stateMutability: "nonpayable",
        outputs: [],
        name: "swap",
        inputs: [
            {
                type: "address",
                name: "token",
                internalType: "address"
            },
            {
                type: "uint256",
                name: "amount",
                internalType: "uint256"
            }
        ]
    },
    {
        type: "function",
        stateMutability: "view",
        outputs: [
            {
                type: "uint256",
                name: "",
                internalType: "uint256"
            }
        ],
        name: "swapSupply",
        inputs: [
            {
                type: "address",
                name: "token",
                internalType: "address"
            }
        ]
    },
    {
        type: "function",
        stateMutability: "view",
        outputs: [
            {
                type: "string",
                name: "",
                internalType: "string"
            }
        ],
        name: "symbol",
        inputs: []
    },
    {
        type: "function",
        stateMutability: "view",
        outputs: [
            {
                type: "uint256",
                name: "",
                internalType: "uint256"
            }
        ],
        name: "totalSupply",
        inputs: []
    },
    {
        type: "function",
        stateMutability: "nonpayable",
        outputs: [
            {
                type: "bool",
                name: "",
                internalType: "bool"
            }
        ],
        name: "transfer",
        inputs: [
            {
                type: "address",
                name: "recipient",
                internalType: "address"
            },
            {
                type: "uint256",
                name: "amount",
                internalType: "uint256"
            }
        ]
    },
    {
        type: "function",
        stateMutability: "nonpayable",
        outputs: [
            {
                type: "bool",
                name: "",
                internalType: "bool"
            }
        ],
        name: "transferFrom",
        inputs: [
            {
                type: "address",
                name: "sender",
                internalType: "address"
            },
            {
                type: "address",
                name: "recipient",
                internalType: "address"
            },
            {
                type: "uint256",
                name: "amount",
                internalType: "uint256"
            }
        ]
    },
    {
        type: "function",
        stateMutability: "nonpayable",
        outputs: [],
        name: "unwrap",
        inputs: [
            {
                type: "uint256",
                name: "amount",
                internalType: "uint256"
            },
            {
                type: "uint256",
                name: "chainId",
                internalType: "uint256"
            }
        ]
    }
] as const;
