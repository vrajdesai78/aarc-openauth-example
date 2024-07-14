"use client";
import "@aarc-xyz/auth-widget/dist/style.css";
import {
  AuthMethod,
  Provider as AuthProvider,
  OAuthProvider,
} from "@aarc-xyz/auth-widget";
import Wallets from "@aarc-xyz/wallet-auth";

interface IProviderProps {
  children: React.ReactNode;
}

export default function Provider({ children }: IProviderProps) {
  const authConfig = {
    Wallet: function Wallet(props: any) {
      return <Wallets {...props} />;
    },
    appearance: {
      logoUrl: "https://dashboard.aarc.xyz/assets/AuthScreenLogo-CNfNjJ82.svg",
      themeColor: "#2D2D2D",
      darkMode: true,
    },
    callbacks: {
      onSuccess: (data: any) => {
        console.log("wallet", data?.data.wallet_address);
        localStorage.setItem("walletAddress", data?.data.wallet_address);
      },
      onError: (error: any) => console.error(error),
      onClose: () => console.log("closed"),
      onOpen: () => console.log("opened"),
    },
    authMethods: [AuthMethod.EMAIL, AuthMethod.WALLET],
    socialAuth: [OAuthProvider.GOOGLE, OAuthProvider.FARCASTER],
    aarcApiKey: process.env.NEXT_PUBLIC_API_KEY!,
    chainId: 8453,
  };

  return <AuthProvider config={authConfig}>{children}</AuthProvider>;
}
