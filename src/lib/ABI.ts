export const PROJECT_CONTRACT_ADDRESS = '0xd31499246573E80FcbF9633190E4D181482033AC'

export const PROJECT_CONTRACT_ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_manager",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_roundManagementContract",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_investorManagementContract",
                "type": "address"
            }
        ],
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
                "name": "name",
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
        "inputs": [
            {
                "internalType": "string",
                "name": "_projectId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "roundId",
                "type": "string"
            }
        ],
        "name": "getFundsInRound",
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
                "internalType": "string",
                "name": "_projectId",
                "type": "string"
            }
        ],
        "name": "getFundsRaisedOutRound",
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
                "internalType": "string",
                "name": "_projectId",
                "type": "string"
            }
        ],
        "name": "getInvestorsInOutRound",
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
                "name": "_projectId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "roundId",
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
        "inputs": [
            {
                "internalType": "string",
                "name": "_projectId",
                "type": "string"
            }
        ],
        "name": "getProject",
        "outputs": [
            {
                "internalType": "address payable",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "fundsOutRound",
                "type": "uint256"
            },
            {
                "internalType": "address[]",
                "name": "investorsOutRound",
                "type": "address[]"
            },
            {
                "internalType": "enum ProjectManagement.ProjectStatus",
                "name": "status",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "roundDeadline",
                "type": "uint256"
            },
            {
                "internalType": "address[]",
                "name": "investors",
                "type": "address[]"
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
        "inputs": [],
        "name": "getProjectIdNow",
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
        "inputs": [],
        "name": "investorManagement",
        "outputs": [
            {
                "internalType": "contract InvestorManagement",
                "name": "",
                "type": "address"
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
        "name": "projectId",
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
                "name": "fundsOutRound",
                "type": "uint256"
            },
            {
                "internalType": "enum ProjectManagement.ProjectStatus",
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
        "name": "roundManagement",
        "outputs": [
            {
                "internalType": "contract RoundManagement",
                "name": "",
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
            },
            {
                "internalType": "string",
                "name": "_projectId",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "updateFundRaisedInRound",
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
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "updateFundRaisedOutRound",
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
            },
            {
                "internalType": "address",
                "name": "_investor",
                "type": "address"
            }
        ],
        "name": "updateInvestorInRound",
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
            },
            {
                "internalType": "address",
                "name": "investor",
                "type": "address"
            }
        ],
        "name": "updateInvestorOutRound",
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
            },
            {
                "internalType": "uint256",
                "name": "newDeadline",
                "type": "uint256"
            }
        ],
        "name": "updateRoundDeadline",
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
            },
            {
                "internalType": "string",
                "name": "_roundId",
                "type": "string"
            }
        ],
        "name": "withdrawFunds",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }
] as const

export const INVESTOR_MANAGEMENT_CONTRACT = "0x267AF09bd5CFF4ef6713245Ce5FBe0d60af87eBc"

export const INVESTOR_MANAGEMENT_CONTRACT_ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_manager",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_roundManagementContract",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_projectManagementContract",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
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
        "name": "FundedOutRound",
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
        "name": "fundProjectInRound",
        "outputs": [],
        "stateMutability": "payable",
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
        "name": "fundProjectOutRound",
        "outputs": [],
        "stateMutability": "payable",
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
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
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
        "name": "projectManagement",
        "outputs": [
            {
                "internalType": "contract ProjectManagement",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "roundManagement",
        "outputs": [
            {
                "internalType": "contract RoundManagement",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
] as const

export const ROUND_MANAGEMENT_CONTRACT = "0x9c9dED808f6Bc48Aa38a7a46F9F140BD15c898a5"

export const ROUND_MANAGEMENT_CONTRACT_ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_manager",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_projectManagementContract",
                "type": "address"
            }
        ],
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
                "internalType": "enum RoundManagement.RoundState",
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
                "internalType": "enum RoundManagement.RoundState",
                "name": "state",
                "type": "uint8"
            }
        ],
        "name": "RoundStateUpdated",
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
            }
        ],
        "name": "deactivatedRound",
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
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
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
        "name": "deactivateRound",
        "outputs": [],
        "stateMutability": "nonpayable",
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
        "inputs": [
            {
                "internalType": "string",
                "name": "_roundId",
                "type": "string"
            }
        ],
        "name": "getRemainingDuration",
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
                "internalType": "string",
                "name": "roundId",
                "type": "string"
            }
        ],
        "name": "getRound",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string[]",
                        "name": "projectIds",
                        "type": "string[]"
                    },
                    {
                        "internalType": "enum RoundManagement.RoundState",
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
                "internalType": "struct RoundManagement.Round",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "getRoundByIndex",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string[]",
                        "name": "projectIds",
                        "type": "string[]"
                    },
                    {
                        "internalType": "enum RoundManagement.RoundState",
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
                "internalType": "struct RoundManagement.Round",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getRoundCount",
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
        "inputs": [],
        "name": "projectManagement",
        "outputs": [
            {
                "internalType": "contract ProjectManagement",
                "name": "",
                "type": "address"
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
                "internalType": "enum RoundManagement.RoundState",
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
    }
] as const