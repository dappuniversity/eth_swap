# Use the pandas library to manipulate the dataset
import pandas as pd

# Import the exported csv of token holders that was acquired via etherscan
df = pd.read_csv(
    "./export-tokenholders-for-contract-0x93b2fff814fcaeffb01406e80b4ecd89ca6a021b (1).csv")

# Remove balances less than 1 million Grumpy
has_more_than_1_million_grumpy = []

for value in df['Balance']:
    if value > 1000000:
        has_more_than_1_million_grumpy.append(True)
    else:
        has_more_than_1_million_grumpy.append(False)

df = df[has_more_than_1_million_grumpy]

# loop over the dataframe using a "while" statement and write that information to a .txt file

i = 0
number_without_decimals = []
with open('solidity_addresses.txt', 'w') as f:
    while i < len(df):

        # store the address for that row into a variable
        address = df.iloc[i, 0]

        # store the balance for that row into a variable
        balance = str(df.iloc[i, 1])

        # There is an inconsent number of integers to the right of the decimal place
        # We can account for this by checking the length of the string to the left of the decimal place

        balance_split_by_decimals = balance.split(".")

        # Every value should have a decimal
        # You can check to make sure that there is a decimal in every value by doing print(len(number_without_decimals)) at the end of the file
        if not "." in balance:
            number_without_decimals.append(i)

        # Use only the value to the left of the decimal as the balance

        balance = str(balance_split_by_decimals[0])

        # Add 9 decimals so that it appears correctly in solidity
        balance = balance + "000000000"

        # write the actual solidity syntax by concatenating strings with the variables

        # This chunk of code is writing the output for the actual solidity contract
        # f.write("_swapLimits[" + address + ""
        #         "] = " + balance + ";")
        # f.write("\n")

        # This chunk of code is writing the output to be called from the deploy script
        f.write('{"Address": "' + address + '",')
        f.write('\n')
        f.write('"Balance": "' + str(balance) + '"},')
        f.write('\n')

        # iterate by 1 to move to the next row
        i += 1

    # save the .txt file
    f.close()
