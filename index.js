// Source code to interact with smart contract

// web3 provider with fallback for old version
window.addEventListener('load', async () => {
    // New web3 provider
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // ask user for permission
            await ethereum.enable();
            // user approved permission
        } catch (error) {
            // user rejected permission
            console.log('user rejected permission');
        }
    }
    // Old web3 provider
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // no need to ask for permission
    }
    // No web3 provider
    else {
        console.log('No web3 provider detected');
    }
  });
  console.log (window.web3.currentProvider)
  
  // contractAddress and abi are setted after contract deploy
  var contractAddress = '0xdf0F7179f795348777CEDEC7532a62e5Daaff5fa';
  var abi = [{"type":"constructor","inputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"BLAST","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract IBlast"}],"stateMutability":"view"},{"type":"function","name":"EARLY_WITHDRAWAL_FEE","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"LP","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"REWARD","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract RewardDistributor"}],"stateMutability":"view"},{"type":"function","name":"USDB","inputs":[],"outputs":[{"name":"","type":"address","internalType":"contract IERC20Rebasing"}],"stateMutability":"view"},{"type":"function","name":"borrow","inputs":[{"name":"borrowAmount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"borrowFee","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"borrowedCollateral","inputs":[{"name":"borrower","type":"address","internalType":"address"}],"outputs":[{"name":"borrowAmount","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"claimAllYield","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"claimContractsGas","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"depositCollateral","inputs":[{"name":"borrowAmount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"depositedLiquidity","inputs":[{"name":"lp","type":"address","internalType":"address"}],"outputs":[{"name":"lpAmount","type":"uint256","internalType":"uint256"},{"name":"depositTimestamp","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getDepositedLiquidity","inputs":[{"name":"lp","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getLPLength","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"liquidation","inputs":[{"name":"borrower","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"nonpayable"},{"type":"function","name":"minimumCollateralRatio","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"poolUSDB","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"provideLiquidityUSDB","inputs":[{"name":"amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"renounceOwnership","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"repayBorrowedUSDB","inputs":[{"name":"amount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"totalDepositedUSDB","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"transferOwnership","inputs":[{"name":"newOwner","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"userCollateral","inputs":[{"name":"borrower","type":"address","internalType":"address"}],"outputs":[{"name":"collateralAmount","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"withdrawCollateral","inputs":[{"name":"withdrawAmount","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"withdrawLiquidityUSDB","inputs":[],"outputs":[{"name":"transferedUSDB","type":"uint256","internalType":"uint256"}],"stateMutability":"nonpayable"},{"type":"event","name":"OwnershipTransferred","inputs":[{"name":"previousOwner","type":"address","indexed":true,"internalType":"address"},{"name":"newOwner","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"error","name":"OwnableInvalidOwner","inputs":[{"name":"owner","type":"address","internalType":"address"}]},{"type":"error","name":"OwnableUnauthorizedAccount","inputs":[{"name":"account","type":"address","internalType":"address"}]}];
  
  //contract instance
  contract = web3.eth.contract(abi).at(contractAddress);
  
  // Accounts
  var account;
  
  web3.eth.getAccounts(function(err, accounts) {
    if (err != null) {
      alert("Error retrieving accounts.");
      return;
    }
    if (accounts.length == 0) {
      alert("No account found! Make sure the Ethereum client is configured properly.");
      return;
    }
    account = accounts[0];
    console.log('Account: ' + account);
    web3.eth.defaultAccount = account;
  });
  
  //Smart contract functions
  function zerofinanceDepositCollateral() {
    
    const collateral = $("#collateral").val();
    const borrow = $("#borrow").val();

    // Convert Ether to Wei using the utility function
    const amountInWei = web3.utils.toWei(collateral, 'ether');

    // Set the gas and gasPrice according to your requirements
    const transactionObject = {
        from: account,
        value: amountInWei
    };

    // Sending Ether with the transaction
    contract.depositCollateral.sendTransaction(borrow, transactionObject, function (err, tx) {
        if (err) {
            console.error("Error: ", err);
        } else {
            console.log("Transaction: ", tx);
        }
    });

    $("#collateral").val('');
    $("#borrow").val('');
}

function zerofinanceWithdrawCollateral() {
    const withdraw = $("#withdrawAmount").val();

    contract.withdrawCollateral(withdraw, { from: account }, function (err, tx) {
        if (err) {
            console.error("Error: ", err);
        } else {
            console.log("Transaction: ", tx);
        }
    });

    $("#withdrawAmount").val('');
}

function zerofinanceBorrow() {
    const borrow = $("#borrowAmount").val();
    contract.borrow(borrow, { from: account }, function (err, tx) {
        if (err) {
            console.error("Error: ", err);
        } else {
            console.log("Transaction: ", tx);
        }
    });

    $("#borrowAmount").val('');
}

function zerofinanceProvideLiquidityUSDB() {
    const liquidity = $("#liquidityAmount").val();
    const liquidityAmount = web3.utils.toWei(liquidity, 'ether');

    contract.provideLiquidityUSDB(liquidityAmount, { from: account }, function (err, tx) {
        if (err) {
            console.error("Error: ", err);
        } else {
            console.log("Transaction: ", tx);
        }
    });

    $("#liquidityAmount").val('');
}

function zerofinanceWithdrawLiquidityUSDB() {
    contract.withdrawLiquidityUSDB({ from: account }, function (err, transferedUSDB) {
        if (err) {
            console.error("Error: ", err);
        } else {
            console.log("Transfered USDB: ", transferedUSDB);
        }
    });
}

function zerofinanceRepayBorrowedUSDB() {
    const repay = $("#repayAmount").val();
    contract.repayBorrowedUSDB(repay, { from: account }, function (err, tx) {
        if (err) {
            console.error("Error: ", err);
        } else {
            console.log("Transaction: ", tx);
        }
    });

    $("#repayAmount").val('');
}

function zerofinanceLiquidation() {
    const borrower = $("#borrowerAddress").val();
    contract.liquidation(borrower, { from: account }, function (err, tx) {
        if (err) {
            console.error("Error: ", err);
        } else {
            console.log("Transaction: ", tx);
        }
    });

    $("#borrowerAddress").val('');
}

function zerofinanceGetUserCollateral() {
    try {
        // Call the USDB function asynchronously
        contract.userCollateral.call(account, function(error, info) {
            if (error) {
                console.error("Error: ", error);
            } else {
                console.log("info: ", info);
                document.getElementById('collateralDeposited').innerHTML = info;
            }
        });
    } catch (error) {
        console.error("Error: ", error);
        // Handle the error as needed
    }
}

function zerofinanceGetUSDB() {
    try {
        // Call the USDB function asynchronously
        contract.USDB.call(function(error, info) {
            if (error) {
                console.error("Error: ", error);
            } else {
                console.log("info: ", info);
                document.getElementById('lastInfo').innerHTML = info;
            }
        });
    } catch (error) {
        console.error("Error: ", error);
        // Handle the error as needed
    }
}