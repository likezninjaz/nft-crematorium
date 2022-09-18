async function main() {
  // const NFTCrematorium = await ethers.getContractFactory("NFTCrematorium");

  // console.log("Deploying on", hre.network.name);

  // console.log("Deploying NFTCrematorium...");
  // const NFTCrematoriumContract = await NFTCrematorium.deploy('0xEA89F1c8CCD90a20187601876Ef703e3f847A3F3', '50000000000000000');
  // console.log("NFTCrematorium deployed to:", NFTCrematoriumContract.address);

  // console.log("Waiting for confirmation");
  // await NFTCrematoriumContract.deployed();

  console.log("Verify the contract:", '0x21dEbf698e83C5fd5d5d1577c3e6d65f51b1DD7d');

  try {
    await hre.run('verify:verify', {
      address: '0x21dEbf698e83C5fd5d5d1577c3e6d65f51b1DD7d',
      network: hre.network.name,
      constructorArguments: [
        '0xEA89F1c8CCD90a20187601876Ef703e3f847A3F3',
        '50000000000000000',
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
