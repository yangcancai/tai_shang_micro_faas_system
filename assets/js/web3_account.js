import { ethers } from "ethers";
import Alpine from 'alpinejs';

const INFURA_ID = "MY_INFURA_ID"; // SWAP IN YOURS FROM https://infura.io/dashboard/ethereum
const localRpcUrl = `https://${window.location.hostname.replace("3000", "8545")}`;

const NETWORKS = {
  localhost: {
    name: "localhost",
    color: "#666666",
    chainId: 31337,
    blockExplorer: "",
    rpcUrl: localRpcUrl,
  },
  mainnet: {
    name: "mainnet",
    color: "#ff8b9e",
    chainId: 1,
    rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
    blockExplorer: "https://etherscan.io/",
  },
  kovan: {
    name: "kovan",
    color: "#7003DD",
    chainId: 42,
    rpcUrl: `https://kovan.infura.io/v3/${INFURA_ID}`,
    blockExplorer: "https://kovan.etherscan.io/",
    faucet: "https://gitter.im/kovan-testnet/faucet", // https://faucet.kovan.network/
  },
  rinkeby: {
    name: "rinkeby",
    color: "#e0d068",
    chainId: 4,
    rpcUrl: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
    faucet: "https://faucet.rinkeby.io/",
    blockExplorer: "https://rinkeby.etherscan.io/",
  },
  ropsten: {
    name: "ropsten",
    color: "#F60D09",
    chainId: 3,
    faucet: "https://faucet.ropsten.be/",
    blockExplorer: "https://ropsten.etherscan.io/",
    rpcUrl: `https://ropsten.infura.io/v3/${INFURA_ID}`,
  },
  goerli: {
    name: "goerli",
    color: "#0975F6",
    chainId: 5,
    faucet: "https://goerli-faucet.slock.it/",
    blockExplorer: "https://goerli.etherscan.io/",
    rpcUrl: `https://goerli.infura.io/v3/${INFURA_ID}`,
  },
  xdai: {
    name: "xdai",
    color: "#48a9a6",
    chainId: 100,
    price: 1,
    gasPrice: 1000000000,
    rpcUrl: "https://dai.poa.network",
    faucet: "https://xdai-faucet.top/",
    blockExplorer: "https://blockscout.com/poa/xdai/",
  },
  polygon: {
    name: "polygon",
    color: "#2bbdf7",
    chainId: 137,
    price: 1,
    gasPrice: 1000000000,
    rpcUrl: "https://polygon-rpc.com/",
    blockExplorer: "https://polygonscan.com/",
  },
  mumbai: {
    name: "mumbai",
    color: "#92D9FA",
    chainId: 80001,
    price: 1,
    gasPrice: 1000000000,
    rpcUrl: "https://rpc-mumbai.maticvigil.com",
    faucet: "https://faucet.polygon.technology/",
    blockExplorer: "https://mumbai.polygonscan.com/",
  },
  localOptimismL1: {
    name: "localOptimismL1",
    color: "#f01a37",
    chainId: 31337,
    blockExplorer: "",
    rpcUrl: "http://" + window.location.hostname  + ":9545",
  },
  localOptimism: {
    name: "localOptimism",
    color: "#f01a37",
    chainId: 420,
    blockExplorer: "",
    rpcUrl: "http://" + window.location.hostname + ":8545",
    gasPrice: 0,
  },
  kovanOptimism: {
    name: "kovanOptimism",
    color: "#f01a37",
    chainId: 69,
    blockExplorer: "https://kovan-optimistic.etherscan.io/",
    rpcUrl: `https://kovan.optimism.io`,
    gasPrice: 0,
  },
  optimism: {
    name: "optimism",
    color: "#f01a37",
    chainId: 10,
    blockExplorer: "https://optimistic.etherscan.io/",
    rpcUrl: `https://mainnet.optimism.io`,
  },
  rinkebyArbitrum: {
    name: "rinkebyArbitrum",
    color: "#28a0f0",
    chainId: 421611,
    blockExplorer: "https://testnet.arbiscan.io/",
    rpcUrl: "https://rinkeby.arbitrum.io/rpc",
  },
  arbitrum: {
    name: "arbitrum",
    color: "#28a0f0",
    chainId: 42161,
    blockExplorer: "https://arbiscan.io/",
    rpcUrl: "https://arb1.arbitrum.io/rpc",
  },
  devnetArbitrum: {
    name: "devnetArbitrum",
    color: "#28a0f0",
    chainId: 421612,
    blockExplorer: "https://nitro-devnet-explorer.arbitrum.io/",
    rpcUrl: "https://nitro-devnet.arbitrum.io/rpc",
  },
  localAvalanche: {
    name: "localAvalanche",
    color: "#666666",
    chainId: 43112,
    blockExplorer: "",
    rpcUrl: `http://localhost:9650/ext/bc/C/rpc`,
    gasPrice: 225000000000,
  },
  fujiAvalanche: {
    name: "fujiAvalanche",
    color: "#666666",
    chainId: 43113,
    blockExplorer: "https://cchain.explorer.avax-test.network/",
    rpcUrl: `https://api.avax-test.network/ext/bc/C/rpc`,
    gasPrice: 225000000000,
  },
  mainnetAvalanche: {
    name: "mainnetAvalanche",
    color: "#666666",
    chainId: 43114,
    blockExplorer: "https://cchain.explorer.avax.network/",
    rpcUrl: `https://api.avax.network/ext/bc/C/rpc`,
    gasPrice: 225000000000,
  },
  testnetHarmony: {
    name: "testnetHarmony",
    color: "#00b0ef",
    chainId: 1666700000,
    blockExplorer: "https://explorer.pops.one/",
    rpcUrl: `https://api.s0.b.hmny.io`,
    gasPrice: 1000000000,
  },
  mainnetHarmony: {
    name: "mainnetHarmony",
    color: "#00b0ef",
    chainId: 1666600000,
    blockExplorer: "https://explorer.harmony.one/",
    rpcUrl: `https://api.harmony.one`,
    gasPrice: 1000000000,
  },
  fantom: {
    name: "fantom",
    color: "#1969ff",
    chainId: 250,
    blockExplorer: "https://ftmscan.com/",
    rpcUrl: `https://rpcapi.fantom.network`,
    gasPrice: 1000000000,
  },
  testnetFantom: {
    name: "testnetFantom",
    color: "#1969ff",
    chainId: 4002,
    blockExplorer: "https://testnet.ftmscan.com/",
    rpcUrl: `https://rpc.testnet.fantom.network`,
    gasPrice: 1000000000,
    faucet: "https://faucet.fantom.network/",
  },
  moonbeam: {
    name: "moonbeam",
    color: "#53CBC9",
    chainId: 1284,
    blockExplorer: "https://moonscan.io",
    rpcUrl: "https://rpc.api.moonbeam.network",
  },
  moonriver: {
    name: "moonriver",
    color: "#53CBC9",
    chainId: 1285,
    blockExplorer: "https://moonriver.moonscan.io/",
    rpcUrl: "https://rpc.api.moonriver.moonbeam.network",
  },
  moonbaseAlpha: {
    name: "moonbaseAlpha",
    color: "#53CBC9",
    chainId: 1287,
    blockExplorer: "https://moonbase.moonscan.io/",
    rpcUrl: "https://rpc.api.moonbase.moonbeam.network",
    faucet: "https://discord.gg/SZNP8bWHZq",
  },
  moonbeamDevNode: {
    name: "moonbeamDevNode",
    color: "#53CBC9",
    chainId: 1281,
    blockExplorer: "https://moonbeam-explorer.netlify.app/",
    rpcUrl: "http://127.0.0.1:9933",
  },
};

function web3AccountInit() {
  document.addEventListener('alpine:init', () => {
    Alpine.data('web3Account', () => ({
      isLogin: false,
      missingEthereum: false,
      network: { chainId: '', name: '' },
      account: { addr: '', balance: '0.00' },
      message: '',
      messageVerified: 0, // 1 -> Success, -1 -> Failed
      async login() {
        return this.init()
      },
      logout() {
        this.network.name = ''
        this.account.addr = ''
        this.account.balance = '0.00'
        this.isLogin = false
      },
      async init() {
        if (!window.ethereum) {
          this.missingEthereum = true
          return
        }

        window.ethereum.on('chainChanged', this.networkChanged.bind(this));
        window.ethereum.on('accountsChanged', this.accountsChanged.bind(this));

        this.missingEthereum = false

        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum)

          this.network = await this.getNetwork(ethereum.chainId, provider)

          let addr = ethereum.selectedAddress
          if (!addr) {
            const accounts = await provider.send("eth_requestAccounts", []);
            addr = accounts[0]
          }

          await this.loadAccount(addr)
        } catch (e) {
          console.error(e)
        }
      },
      async loadAccount(addr) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const balance = await provider.getBalance(addr)

        this.account = {
          addr,
          balance: ethers.utils.formatEther(balance)
        }

        this.isLogin = true
      },
      async getNetwork(chainId, provider) {
        // Not sure why chainId here is null, but provider.getNetwork can get correct one.
        let network = await provider.getNetwork(chainId)
        for (const n in NETWORKS) {
          if (NETWORKS[n].chainId === network.chainId) {
            return NETWORKS[n]
          }
        }
        return network
      },
      async networkChanged(chainId) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        this.network = await this.getNetwork(chainId, provider)

        window.location.reload()
      },
      async accountsChanged(accounts) {
        if (accounts.length === 0) {
          return this.logout()
        }

        await this.loadAccount(accounts[0])
      },
      async signMessage(el) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const signature = await signer.signMessage(this.message);

        el.dispatchEvent(new CustomEvent('send-signed-message', { detail: { msg: this.message, signature } }))
      },
      handleVerifiedResult(result) {
        if (result) {
          this.messageVerified = 1;
        } else {
          this.messageVerified = -1;
        }
        setTimeout(() => { this.messageVerified = 0 }, 2000)
      }
    }))
  })
}

module.exports = {
  web3AccountInit
};
