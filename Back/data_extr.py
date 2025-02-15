import time
from moralis import evm_api
import pandas as pd

def get_latest_block(key):
    api_key = key
    params = {
        "chain": "eth",
        "date": str(time.time())  # Get the latest block by date
    }
    result = evm_api.block.get_date_to_block(
        api_key=api_key,
        params=params,
    )
    latest_block = result.get("block")
    print(f"Latest Block: {latest_block}")
    return latest_block

def get_transactions_for_block(key, block_number,chain):
    api_key = key
    params = {
        "chain": chain,
        "block_number_or_hash": str(block_number)
    }
    result = evm_api.block.get_block(  # Fetch full block details
        api_key=api_key,
        params=params,
    )

    transactions = result.get("transactions", [])  # Extract transactions
    return transactions

def save_transactions_to_csv(transactions, filename,i):
    global df
    if not transactions:
        print("No transactions found!")
        return

    df = pd.DataFrame(transactions)
    if i==1:
        test=True
    else:
        test=False
    df.to_csv(filename, index=False,mode ="a",header=test)
    print(f"Transactions saved to {filename}")






key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjZlMjg3ZmRhLWQ1NDAtNDBjZC05ZGIwLTk4M2IyMzE3ODJhYSIsIm9yZ0lkIjoiNDMxMTYzIiwidXNlcklkIjoiNDQzNTExIiwidHlwZUlkIjoiNzg0YThlZTQtMTA3ZS00MmI0LWI0OTktYjkzNzVkMWVhZGYwIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3Mzk0NTU3ODEsImV4cCI6NDg5NTIxNTc4MX0.CWFvYs-pX9UXDdZ8r5ElZzaEDbeUzfza1exzqPIy5D0"
latest_block = get_latest_block(key)
chains = ["eth", "bsc", "polygon","avalanche","fantom"]
i=0
for chain in chains:
    i+=1
    transactions = get_transactions_for_block(key, latest_block, chain)
    save_transactions_to_csv(transactions,r"C:\Users\ROUA\Desktop\ai odyssey\transactions.csv",i)
