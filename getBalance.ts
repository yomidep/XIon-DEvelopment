import { StargateClient } from '@cosmjs/stargate';

const rpcEndpoint = 'https://rpc.xion-testnet-1.burnt.com:443';

async function main() {
    const bobAddress = 'xion1rf4jeg8r4ddhtutr2h73p6feynymjn9jscstzh'

    const client = await StargateClient.connect(rpcEndpoint);
    const balance = await client.getAllBalances(bobAddress);

    console.log('Balance:', balance)
}

main()