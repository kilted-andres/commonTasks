import { getApi } from "./connection";
import { generateAccount } from "./generators/generateAccount";
import { mnemonicGenerate } from "@polkadot/util-crypto";
import { generateFullDid } from "./generators/generateFullDid";
import * as Kilt from "@kiltprotocol/sdk-js";

async function makeNewAccount(): Promise<Kilt.KiltKeyringPair> {
  const api = await getApi();
  const chainName = (await api.rpc.system.chain()).toHuman();
  const newMnemonic = mnemonicGenerate();
  const newAccount = generateAccount(newMnemonic);

  console.log("newMnemonic: ", newMnemonic);
  console.log("newAccount ", newAccount.address);
  console.log("made on this blockchain: ", chainName);

  if (chainName === "KILT Peregrine") {
    const peregrineFaucetURL = "https://faucet.peregrine.kilt.io/?";

    console.log(
      `get some funds for that account on the faucet here: ${peregrineFaucetURL}${newAccount.address}`
    );
  }

  await api.disconnect();
  return newAccount;
}
