export const PROJECT_CONTRACT_ADDRESS = '0x43b65b0a80ff545055c557d91381d1Bb4C6EFBE1'

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
            },
            {
                "internalType": "string",
                "name": "_projectId",
                "type": "string"
            }
        ],
        "name": "approveProject",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "currentProjectId",
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
        "inputs": [],
        "name": "getCurrentProjectId",
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
                "name": "_roundId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_projectId",
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
                "internalType": "address",
                "name": "_investor",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_projectId",
                "type": "string"
            }
        ],
        "name": "getFundsInRoundOfInvestor",
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
        "name": "getFundsOutRound",
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
                "internalType": "address",
                "name": "_investor",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_projectId",
                "type": "string"
            }
        ],
        "name": "getFundsOutRoundOfInvestor",
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
            },
            {
                "internalType": "string",
                "name": "_projectId",
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
                "name": "_projectId",
                "type": "string"
            }
        ],
        "name": "getInvestorsOutRound",
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
                "internalType": "address",
                "name": "_investor",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_projectId",
                "type": "string"
            }
        ],
        "name": "getNumberOfInvestmentsOfInvestor",
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
        "name": "getPendingProjects",
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
                "name": "_investor",
                "type": "address"
            }
        ],
        "name": "getProjectIdsInRoundOfInvestor",
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
                "name": "_investor",
                "type": "address"
            }
        ],
        "name": "getProjectIdsOutRoundOfInvestor",
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
        "name": "getProjectOwner",
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
        "inputs": [
            {
                "internalType": "string",
                "name": "_roundId",
                "type": "string"
            }
        ],
        "name": "getRejectedProjects",
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
                "name": "projectId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "roundId",
                "type": "string"
            }
        ],
        "name": "getRequireRoundStatus",
        "outputs": [
            {
                "internalType": "enum ProjectUtils.RequireRoundStatus",
                "name": "",
                "type": "uint8"
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
            }
        ],
        "name": "getRoundDeadline",
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
                "internalType": "address",
                "name": "_investor",
                "type": "address"
            }
        ],
        "name": "getTotalFundsOfInvestor",
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
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "investors",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "totalFunds",
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
                "name": "fundsOutRound",
                "type": "uint256"
            },
            {
                "internalType": "enum ProjectUtils.ProjectStatus",
                "name": "status",
                "type": "uint8"
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
            },
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "registerProject",
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
        "name": "rejectProject",
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
                "internalType": "uint256",
                "name": "newFee",
                "type": "uint256"
            }
        ],
        "name": "setProjectFee",
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
                "name": "_roundId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_projectId",
                "type": "string"
            }
        ],
        "name": "withdrawFundsInRound",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }
] as const

export const ROUND_MANAGEMENT_CONTRACT = "0xc72aaf591fC109700dbF9Ed0Ae440BA865f41a0F"

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
                "name": "name",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "duration",
                "type": "uint256"
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
                "internalType": "enum RoundUtils.RoundState",
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
        "name": "addApprovedProject",
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
        "inputs": [],
        "name": "currentRoundId",
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
        "inputs": [],
        "name": "getCurrentRoundId",
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
                        "internalType": "enum RoundUtils.RoundState",
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
                "internalType": "struct RoundUtils.Round",
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
                "name": "_projectId",
                "type": "string"
            }
        ],
        "name": "getRoundIdsForProject",
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
        "name": "getRoundState",
        "outputs": [
            {
                "internalType": "enum RoundUtils.RoundState",
                "name": "",
                "type": "uint8"
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
        "name": "getTotalFundsInRound",
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
                "internalType": "enum RoundUtils.RoundState",
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
                "internalType": "address",
                "name": "_projectManagementContract",
                "type": "address"
            }
        ],
        "name": "setProjectContractAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const