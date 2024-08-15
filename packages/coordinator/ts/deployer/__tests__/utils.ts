// import { ENTRYPOINT_ADDRESS_V07, createSmartAccountClient } from "permissionless";
// import { signerToSimpleSmartAccount } from "permissionless/accounts";
// import { createPimlicoPaymasterClient } from "permissionless/clients/pimlico";
import { createPublicClient, createWalletClient, http } from "viem";
import { generatePrivateKey, mnemonicToAccount, privateKeyToAccount } from "viem/accounts";
import { hardhat } from "viem/chains";

const hardhatRpc = "http://localhost:8545";

export const getWalletClient = () =>
  createWalletClient({
    account: mnemonicToAccount("test test test test test test test test test test test junk"),
    chain: hardhat,
    transport: http(hardhatRpc),
  });


export const getPublicClient = () => {
  const transport = http(hardhatRpc);

  return createPublicClient({
    chain: hardhat,
    transport,
    pollingInterval: 100,
  });
};
