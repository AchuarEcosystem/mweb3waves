{-# STDLIB_VERSION 3 #-}
{-# CONTENT_TYPE DAPP #-}
{-# SCRIPT_TYPE ACCOUNT #-}


@Callable(i)
func deposit () = {
    let pmt = extract(i.payment)
    if (isDefined(pmt.assetId))
        then throw("can hodl waves only at the moment")
        else {
            let currentKey = toBase58String(i.caller.bytes)
            let xxxInvestorBalance = ((currentKey + "_") + "ib")
            let currentAmount = match getInteger(this, xxxInvestorBalance) {
                case a: Int => a
                case _ => 0
            }
            let newAmount = (currentAmount + pmt.amount)
            WriteSet([DataEntry(xxxInvestorBalance, newAmount)])
            }
    }


@Verifier(tx)
func verify () = match tx {
    case t: InvokeScriptTransaction => true
    case c: DataTransaction => true
    case d: SetScriptTransaction =>
        sigVerify(tx.bodyBytes, tx.proofs[0], base58'DmGuFUH4FowzKombiviDc5zueFtTtRAcEYoEs9d8Rmd4')
    case _ => false
}

# broadcast(invokeScript({dApp:"3N7b5RREJBhrQwb5AiKUB2upCxMSfNw4nok", call:{function:"deposit", args:[]}, payment:[{amount:100000000, asset:null}]}))
