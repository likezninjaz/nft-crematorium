async function main() {
  // const NFTCrematorium = await ethers.getContractFactory("NFTCrematorium");

  // console.log("Deploying on", hre.network.name);

  // console.log("Deploying NFTCrematorium...");
  // const NFTCrematoriumContract = await NFTCrematorium.deploy();
  // console.log("NFTCrematorium deployed to:", NFTCrematoriumContract.address);

  // console.log("Waiting for confirmation");
  // await NFTCrematoriumContract.deployed();

  console.log("Verify the contract:", '0xaC1D3f4428AE0025CD631715E1562fd4FA4F901C');

  try {
    await hre.run('verify:verify', { address: '0xaC1D3f4428AE0025CD631715E1562fd4FA4F901C', network: hre.network.name });
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
