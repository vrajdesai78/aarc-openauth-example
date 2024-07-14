"use client";

import { useAuthWidget } from "@aarc-xyz/auth-widget";
import { AarcEthersSigner } from "@aarc-xyz/ethers-v6-signer";
import { parseEther } from "viem";

export default function Home() {
  const { openAuthWidget } = useAuthWidget();

  // Get the walletAddress from the atom store
  const walletAddress = localStorage.getItem("walletAddress");

  // Get the sessionKey from localStorage
  const sessionKey = localStorage.getItem("sessionKey");

  const signer = new AarcEthersSigner(
    "https://base-mainnet.public.blastapi.io",
    {
      apiKeyId: process.env.NEXT_PUBLIC_API_KEY!,
      wallet_address: walletAddress!,
      sessionKey: sessionKey!,
      chainId: 8453, // Change with your desired chainId
    }
  );

  // Function to send ETH using the signer
  const sendETH = async () => {
    const tx = await signer.sendTransaction({
      // Change with your wallet address
      to: "0x3039e4a4a540F35ae03A09f3D5A122c49566f919",
      // Change with the amount of ETH you want to send
      value: parseEther("0.000001"),
    });
    console.log("tx", tx);
  };

  return (
    <div className='flex flex-col bg-slate-800 items-center w-full h-screen justify-center'>
      {/* Conditionally rendering button */}
      {!walletAddress ? (
        <button
          className='bg-slate-300 text-black rounded-lg p-3'
          onClick={openAuthWidget} // Open the auth widget
        >
          Sign In
        </button>
      ) : (
        <div className='flex flex-col text-slate-200 gap-4'>
          {/* Showing wallet address from store */}
          <span>{walletAddress}</span>
          <button
            className='bg-slate-600 text-white rounded-lg p-3 mt-4'
            onClick={sendETH}
          >
            Send ETH
          </button>
        </div>
      )}
    </div>
  );
}
