import { getApi } from './connection';
import { generateAccount } from './generators/generateAccount';
import { generateFullDid } from './generators/generateFullDid';

import readFlags from './flags';

makeSporranNewIdentity(
  'author topple amused bind lobster earn thunder grunt kick chat exhaust census',
);

async function makeSporranNewIdentity(payerMnemonic: string) {
  const flags = await readFlags();
  flags.verbose && console.log('Flags: ', flags);
  const api = await getApi(flags.chain);
  const chainName = (await api.rpc.system.chain()).toHuman();
  console.log('working on this blockchain: ', chainName);

  console.log(
    'To make this Identity Sporran compatible we need to use the same Mnemonic for the Account as for the DID.',
    'And the "sr25519" scheme!',
    'Make sure the Account was also created using that scheme.',
  );
  console.log('Mnemonic for the Account and the DID:', payerMnemonic);

  const payer = generateAccount(payerMnemonic, 'sr25519');

  console.log('payer account address:', payer.address);

  const newIdentity = await generateFullDid(payer, payerMnemonic, 'sr25519');

  console.log('Identity: ', JSON.stringify(newIdentity, null, 2));

  await api.disconnect();
}
