export const FUNDING_CONTRACT_ADDRESS = '0xb42c27C8687d662b650e683C94071c0Ea3Bee8aA'

export const FUNDING_CONTRACT_ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "length",
                "type": "uint256"
            }
        ],
        "name": "StringsInsufficientHexLength",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "projectId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "FundWithdrawn",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "projectId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "investor",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Funded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "projectId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "investor",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "FundsTransferredToManager",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "roundId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "projectId",
                "type": "string"
            }
        ],
        "name": "ProjectAddedToRound",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "roundId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "projectId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "projectOwner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "rewardAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "rank",
                "type": "uint256"
            }
        ],
        "name": "ProjectAwarded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "projectId",
                "type": "string"
            }
        ],
        "name": "ProjectPublished",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "projectId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "ProjectRegistered",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "projectId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "newMetaData",
                "type": "string"
            }
        ],
        "name": "ProjectUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "roundId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "metadata",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "duration",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "enum FundingPlatform.RoundState",
                "name": "state",
                "type": "uint8"
            }
        ],
        "name": "RoundCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "roundId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "enum FundingPlatform.RoundState",
                "name": "state",
                "type": "uint8"
            }
        ],
        "name": "RoundStateUpdated",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_roundId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_projectId",
                "type": "string"
            }
        ],
        "name": "addProjectToRound",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_roundId",
                "type": "string"
            }
        ],
        "name": "awardTopProjects",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_description",
                "type": "string"
            },
            {
                "internalType": "string[]",
                "name": "_images",
                "type": "string[]"
            },
            {
                "internalType": "uint256",
                "name": "_duration",
                "type": "uint256"
            }
        ],
        "name": "createRound",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_roundId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_projectId",
                "type": "string"
            }
        ],
        "name": "fundProject",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getActiveRoundIds",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllRoundIds",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_projectId",
                "type": "string"
            }
        ],
        "name": "getInvestors",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_roundId",
                "type": "string"
            }
        ],
        "name": "getInvestorsInRound",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_type",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_id",
                "type": "string"
            }
        ],
        "name": "getMeta",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getPrivateProjectIds",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getProjectsIds",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_roundId",
                "type": "string"
            }
        ],
        "name": "getProjectsInRound",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getPublicProjectIds",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "investors",
        "outputs": [
            {
                "internalType": "address",
                "name": "investorAddress",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_roundId",
                "type": "string"
            }
        ],
        "name": "isRoundActive",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "manager",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "projectCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "projectFee",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "projectIds",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "projects",
        "outputs": [
            {
                "internalType": "address payable",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "fundsRaised",
                "type": "uint256"
            },
            {
                "internalType": "enum FundingPlatform.ProjectStatus",
                "name": "status",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "roundDeadline",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "metadata",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_projectId",
                "type": "string"
            }
        ],
        "name": "publishProject",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_description",
                "type": "string"
            },
            {
                "internalType": "string[]",
                "name": "_images",
                "type": "string[]"
            }
        ],
        "name": "registerProject",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "rewardAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "roundCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "roundIds",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "rounds",
        "outputs": [
            {
                "internalType": "enum FundingPlatform.RoundState",
                "name": "state",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "duration",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "metadata",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_projectId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_oldName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_oldDescript",
                "type": "string"
            },
            {
                "internalType": "string[]",
                "name": "_oldImages",
                "type": "string[]"
            },
            {
                "internalType": "string",
                "name": "_newName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_newDescript",
                "type": "string"
            },
            {
                "internalType": "string[]",
                "name": "_newImages",
                "type": "string[]"
            }
        ],
        "name": "updateProject",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_projectId",
                "type": "string"
            }
        ],
        "name": "withdrawFunds",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }
] as const
