async function main() {
  // const NFTCrematorium = await ethers.getContractFactory("NFTCrematorium");

  // console.log("Deploying on", hre.network.name);

  // console.log("Deploying NFTCrematorium...");
  // const NFTCrematoriumContract = await NFTCrematorium.deploy('0xb5123e03b023e7063686Eef637B8621f0d433bE0', 1e14);
  // console.log("NFTCrematorium deployed to:", NFTCrematoriumContract.address);

  // console.log("Waiting for confirmation");
  // await NFTCrematoriumContract.deployed();

  console.log("Verify the contract:", '0x2ba1B66905adE7c0BA7bCfC2bCcDfa892F0A597d');

  try {
    await hre.run('verify:verify', {
      address: '0x2ba1B66905adE7c0BA7bCfC2bCcDfa892F0A597d',
      network: hre.network.name,
      constructorArguments: [
        '0xb5123e03b023e7063686Eef637B8621f0d433bE0',
        1e14,
      ],
    });
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
