import { Injectable, Logger } from "@nestjs/common";
import { deserializePermissionAccount } from "@zerodev/permissions";
import { toECDSASigner } from "@zerodev/permissions/signers";
import { createKernelAccountClient } from "@zerodev/sdk";
import { KERNEL_V3_1 } from "@zerodev/sdk/constants";
// import { createBundlerClient, ENTRYPOINT_ADDRESS_V07 } from "permissionless";
import { createPublicClient, http } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import hre from "hardhat";
import { 
  ConstantInitialVoiceCreditProxy__factory as ConstantInitialVoiceCreditProxyFactory, 
  ContractStorage, 
  Deployment, 
  FreeForAllGatekeeper__factory as FreeForAllGatekeeperFactory
 } from "maci-contracts";

// import { genPimlicoRPCUrl } from "../common/pimlico";
import { CryptoService } from "../crypto/crypto.service";
import { FileService } from "../file/file.service";

import { IDeployMaciArgs, IDeployPollArgs } from "./types";

/**
 * DeployerService is responsible for deploying contracts.
 */
@Injectable()
export class DeployerService {
  /**
   * Logger
   */
  private readonly logger = new Logger(DeployerService.name);

  /**
   * Deployment instance
   */
  private readonly deployment: Deployment;

  /**
   * Contract storage instance
   */
  private readonly storage: ContractStorage;

  /**
   * Create a new instance of DeployerService
   * @param fileService
   */
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly fileService: FileService,
  ) {
    this.fileService = fileService;
    this.logger = new Logger(DeployerService.name);

    this.deployment = Deployment.getInstance(hre);
    this.deployment.setHre(hre);

    this.storage = ContractStorage.getInstance()
  }

  /**
   * Generate a session key
   * 
   * @returns session key address
   */
  generateSessionKey(): `0x${string}` {
    // const sessionPrivateKey = generatePrivateKey();

    // const sessionKeySigner = toECDSASigner({
    //   signer: privateKeyToAccount(sessionPrivateKey),
    // });

    // const sessionKeyAddress = sessionKeySigner.account.address;

    const sessionKeyAddress = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
    const sessionPrivateKey = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
    // save the key
    this.fileService.storeSessionKey(sessionPrivateKey, sessionKeyAddress);

    return sessionKeyAddress;
  }

  /**
   * Deactivate a session key
   *
   * @param sessionKeyAddress - key address
   */
  deactivateSessionKey(sessionKeyAddress: `0x${string}`): void {
    this.fileService.deleteSessionKey(sessionKeyAddress);
  }

  /**
   * Deploy MACI contracts
   *
   * @param args - deploy maci arguments
   * @param options - ws hooks
   * @returns - deployed maci contract
   * @throws error if deploy is not successful
   */
  async deployMaci({ approval, sessionKeyAddress, chainId, config }: IDeployMaciArgs) {
    // // get the session key from storage
    // const sessionKey = this.fileService.getSessionKey(sessionKeyAddress);

    // const publicClient = createPublicClient({
    //   transport: http(process.env.PIMLICO_RPC_URL),
    // });

    // // Using a stored private key
    // const sessionKeySigner = toECDSASigner({
    //   signer: privateKeyToAccount(sessionKey),
    // });

    // const sessionKeyAccount = await deserializePermissionAccount(
    //   publicClient,
    //   ENTRYPOINT_ADDRESS_V07,
    //   KERNEL_V3_1,
    //   approval,
    //   sessionKeySigner,
    // );

    // const kernelClient = createKernelAccountClient({
    //   bundlerTransport: http(process.env.PIMLICO_RPC_URL),
    //   entryPoint: ENTRYPOINT_ADDRESS_V07,
    //   account: sessionKeyAccount,
    // });

    // // create first user op for voice credit proxy
    // const gatekeeperConfig = config.ConstantInitialVoiceCreditProxy 
    // const voiceCreditProxyConfig = config.ConstantInitialVoiceCreditProxy

    // if (voiceCreditProxyConfig?.deploy) {
    //   const voiceCreditsProxyDeployTx = await kernelClient.deployContract({
    //     abi: ConstantInitialVoiceCreditProxyFactory.abi,
    //     args: [voiceCreditProxyConfig.amount],
    //     bytecode: ConstantInitialVoiceCreditProxyFactory.bytecode,
    //     account: sessionKeyAccount.address,
    //   })

    //   console.log(voiceCreditsProxyDeployTx)
    // } else {

    // }

    // if (gatekeeperConfig?.deploy) {
    //   const gatekeeperDeployTx = await kernelClient.deployContract({
    //     abi: FreeForAllGatekeeperFactory.abi,
    //     args: [gatekeeperConfig.amount],
    //     bytecode: FreeForAllGatekeeperFactory.bytecode,
    //     account: sessionKeyAccount.address,
    //   })

    //   console.log(gatekeeperDeployTx)
    // } else {

    // }
  }

  async deployPoll({ approval, sessionKeyAddress, chainId, config }: IDeployPollArgs) {
  }
}
