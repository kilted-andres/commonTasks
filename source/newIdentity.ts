import { mnemonicGenerate } from '@polkadot/util-crypto';

import * as Kilt from '@kiltprotocol/sdk-js';

import { getApi } from './connection';
import { generateAccount } from './generators/generateAccount';
import { generateFullDid } from './generators/generateFullDid';

import { ACCOUNT_MNEMONIC } from './configuration';
import readFlags from './flags';

makeNewIdentity(ACCOUNT_MNEMONIC);

async function makeNewIdentity(payerMnemonic: string) {
  const flags = await readFlags();
  flags.verbose && console.log('Flags: ', flags);
  const api = await getApi(flags.chain);
  const chainName = (await api.rpc.system.chain()).toHuman();
  console.log('working on this blockchain: ', chainName);

  const payer = generateAccount(payerMnemonic, 'sr25519');

  const newMnemonic = mnemonicGenerate();
  const newIdentity = await generateFullDid(payer, newMnemonic);

  console.log('newMnemonic: ', newMnemonic);
  console.log('payer account ', payer.address);
  console.log('Identity: ', JSON.stringify(newIdentity, null, 2));

  await api.disconnect();
}
