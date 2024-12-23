import { GasPrice, SigningStargateClient, coins } from '@cosmjs/stargate';
import { DirectSecp256k1Wallet } from '@cosmjs/proto-signing';
import { toBech32 } from '@cosmjs/encoding';
import { rawSecp256k1PubkeyToRawAddress } from '@cosmjs/amino';

import * as dotenv from 'dotenv';
dotenv.config();

// private key for the account you want to use
const key = process.env.PRIVATE_KEY!;

export const recipient = 'xion1rf4jeg8r4ddhtutr2h73p6feynymjn9jscstzh';
const rpcEndpoint = 'https://rpc.xion-testnet-1.burnt.com:443';

// The main function to create and use the SigningStargateClient
async function main() {
    // Creating a wallet instance from a given mnemonic
    const wallet = await DirectSecp256k1Wallet.fromKey(Buffer.from(key, 'hex'), "xion");

    // Fetching account from the wallet
    const [account] = await wallet.getAccounts();
    const alice_sender = toBech32("xion", rawSecp256k1PubkeyToRawAddress(account.pubkey))

    const gasPrice = GasPrice.fromString("0uxion");
    const txOptions = { gasPrice };

    // Creating an instance of SigningStargateClient
    const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet, txOptions);

    const amount = coins('1', 'uxion');

    // Broadcasting the transaction
    const result = await client.sendTokens(alice_sender, recipient, amount, "auto", "sending a msg!");
    console.log(result)
}

main()