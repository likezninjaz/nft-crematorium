async function main() {
  const NFTCrematorium = await ethers.getContractFactory("NFTCrematorium");

  console.log("Deploying on", hre.network.name);

  console.log("Deploying NFTCrematorium...");
  const NFTCrematoriumContract = await NFTCrematorium.deploy();
  console.log("NFTCrematorium deployed to:", NFTCrematoriumContract.address);

  console.log("Waiting for confirmation");
  await NFTCrematoriumContract.deployed();

  console.log("Verify the contract:", NFTCrematoriumContract.address);

  try {
    await hre.run('verify:verify', { address: NFTCrematoriumContract.address, network: hre.network.name });
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
